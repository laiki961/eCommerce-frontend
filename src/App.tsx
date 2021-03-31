import { faBars, faSearch, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { Category, ProductList } from "./domain/backendDos";
import BackendExtService from "./extService/BackendExtService";
import AuthService from "./service/AuthService";
import ShoppingCartService from "./service/ShoppingCartService";
import CheckoutPage from "./ui/page/CheckoutPage";
import LoginPage from "./ui/page/LoginPage";
import ProductDetailsPage from "./ui/page/ProductDetailsPage";
import ProductListingPage from "./ui/page/ProductListingPage";
import ShoppingCartPage from "./ui/page/ShoppingCartPage";
import ThankyouPage from "./ui/page/ThankyouPage";

type Props = {};
type State = {
  isLoading: boolean,
  isShowSidebar: boolean,
  isShowNavbar: boolean,
  category?: Category[],
//   search: string,
//   searchProduct?: ProductList
};

export default class App extends React.Component<Props, State> {
    state = {
        isLoading: false,
        isShowNavbar: true
        // search: ""
    } as State;

    shoppingCartService: ShoppingCartService; //contain the latest shoppingCartItems
    authService: AuthService;

    prevScrollpos: number;

    constructor(props: Props) {
        super(props);
        this.onAuthStateChange = this.onAuthStateChange.bind(this);
        this.onClickSignOut = this.onClickSignOut.bind(this);

        this.onClickSidebarToggle = this.onClickSidebarToggle.bind(this);
        this.onLoadedCategoryList = this.onLoadedCategoryList.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.shoppingCartService = new ShoppingCartService();
        this.authService = new AuthService(this.onAuthStateChange);

        this.prevScrollpos = window.pageYOffset;
        window.onscroll = () => {
            let currentScrollPos = window.pageYOffset;
            if (this.prevScrollpos > currentScrollPos) {
                this.setState({isShowNavbar: true}) ;
            } else {
                this.setState({isShowNavbar: false});
            }
            this.prevScrollpos = currentScrollPos;
        }

    }

    onAuthStateChange(isLoading: boolean){
        this.setState({
            isLoading: isLoading
        })
    }

    onClickSignOut(event: React.MouseEvent<any>){
        event.preventDefault();
        this.authService.signOut();
    }

    componentDidMount() {
        this.authService.init();
        BackendExtService.getCategoryList(this.onLoadedCategoryList);
    }

    onLoadedCategoryList(data: Category[]){
        this.setState({category: data})
    }

    onClickSidebarToggle() {
        this.setState((prevState) => ({
            isShowSidebar: !prevState.isShowSidebar
        }))
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        // @ts-ignore
        this.setState({
            [name]: value
            } as State);
    }

    renderCategoryList() {
        const list: JSX.Element[] = [];
        if (!this.state.category) {
            return null;
        }
        console.log(this.state.category)
        for (let category of this.state.category){
        list.push(
            <Link to={"/category/" + category.id} key={category.id}>
                <div className="categoryName">{category.name}</div>
            </Link>
        )}
        return list;
    }


    // renderSearchProduct(){
    //     const list: JSX.Element[] = [];
    //     if(this.state.search == null){
    //         return null;
    //     }
    //     for(let products of this.state.searchProduct){
    //         list.push(
    //             <Link to={"/details/" + products.productId} key={products.productId}>
    //                 <div className="searchProduct">
    //                     {products.imageUrl}
    //                     <div>
    //                         <span>{products.productName}</span>
    //                         <span>{products.price}</span>
    //                     </div>
    //                 </div>
    //             </Link>
    //         )
    //     }
    //     return list;
    // }




    render() {
        const year = new Date().getFullYear();

        let loadingOverlayClassName = "loadingOverlay";
        if(this.state.isLoading){
            loadingOverlayClassName += " active";
        }

        let sidebarClassName = "sidenav";
        if (this.state.isShowSidebar) {
            sidebarClassName += " active";
        }

        let navbarStyle = {};
        if (this.state.isShowNavbar) {
            navbarStyle = {top: 0};
        } else {
            navbarStyle = {top: "-58px"}
        }

        return (
        <div id="App" className="App">
            <HashRouter>
                <div className="narBar-Container">
                <Navbar expand="lg" className="siteNavbar" style={navbarStyle}>
                <Container>
                    <FontAwesomeIcon 
                        className="nav-icon" 
                        icon={faBars}
                        onClick={this.onClickSidebarToggle}
                    />
                    <Navbar.Brand href="#">Ventail</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">

                    {/* <div className="searchBox">
                        <input 
                            className="searchInput" 
                            type="text" 
                            name="search" 
                            value={this.state.search} 
                            placeholder="Search" 
                            onChange={this.handleInputChange}
                        />
                        <button className="searchButton" >
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </div> */}

                    <div className="dropdown">
                        {
                            (AuthService.isSignedIn())? (
                                <Nav.Link onClick={this.onClickSignOut}>
                                    <FontAwesomeIcon className="nav-icon signOut" icon={faSignOutAlt}/>
                                </Nav.Link>    
                            ) : (
                                <Nav.Link href="#/login" className="btn">
                                    <FontAwesomeIcon className="nav-icon account" icon={faUser} />
                                </Nav.Link>
                            )
                        }
                        <div className="dropdown-content">
                            <a href="#/login">Login</a>
                        </div>
                        
                    </div>

                    <Nav.Link href="#/cart" className="btn">
                        <FontAwesomeIcon
                        className="nav-icon cart"
                        icon={faShoppingCart}
                        />
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>

            <div className={sidebarClassName}>
                {this.renderCategoryList()}
            </div>
            
            {/* HashRouter: using the string after # to decide which page the user are going */}
            <Switch>
                <Route exact path="/">
                    <ProductListingPage />
                </Route>
                <Route 
                    exact 
                    path="/category/:category"
                    render={routeProps => (
                        <ProductListingPage
                            categoryId={routeProps.match.params.category}
                        />
                    )}
                />
                <Route exact path="/details/:productId">
                    <ProductDetailsPage
                    shoppingCartService={this.shoppingCartService} // Step: 1 -> new productDetailsPage({shopingCartService: this.shoppingCartService}) i.e. constructor
                    />
                </Route>
                <Route exact path="/cart">
                    <ShoppingCartPage
                    shoppingCartService={this.shoppingCartService}
                    />
                </Route>
                <Route exact path="/checkout/:transactionId">
                    <CheckoutPage />
                </Route>
                <Route exact path="/login">
                    <LoginPage authService={this.authService} />
                </Route>
                <Route exact path="/thankyou">
                    <ThankyouPage />
                </Route>
            </Switch>
            

            <div className={loadingOverlayClassName}>
                <div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>
            </div>

            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p className="text-justify">
                        Ventail Company Ltd. <br />
                        <i>Bike eCommerce </i>
                        <br /> Created by Nikki Ip
                        </p>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                        <li>
                            <a href="#/">
                            Bike
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="col-xs-6 col-md-3">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                        <li>
                            <a href="http://scanfcode.com/about/">About Us</a>
                        </li>
                        <li>
                            <a href="http://scanfcode.com/contact/">Contact Us</a>
                        </li>
                        <li>
                            <a href="http://scanfcode.com/contribute-at-scanfcode/">
                            Weather
                            </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <hr />
                </div>
                <div className="container">
                    <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">
                        Copyright @ {year} All Rights Reserved by Nikki.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                        {/* <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li> */}
                        <li>
                            <a className="linkedin" href="#">
                            <i className="fa fa-linkedin"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </footer>
            </HashRouter>
        </div>
        );
    }
}
