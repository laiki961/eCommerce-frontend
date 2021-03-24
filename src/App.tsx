import { faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ShoppingCartService from './service/ShoppingCartService';
import CheckoutPage from './ui/page/CheckoutPage';
import LoginPage from './ui/page/LoginPage';
import ProductDetailsPage from './ui/page/ProductDetailsPage';
import ProductListingPage from './ui/page/ProductListingPage';
import ShoppingCartPage from './ui/page/ShoppingCartPage';
import ThankyouPage from './ui/page/ThankyouPage';

type Props = {};
type State = {};

export default class App extends React.Component<Props, State>{
  shoppingCartService: ShoppingCartService; //contain the latest shoppingCartItems
  constructor(props: Props){
    super(props);

    this.shoppingCartService = new ShoppingCartService();
  }


  
  render(){
  const year = new Date().getFullYear();

    return (
      <div className="App">
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#">Ventail</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                
                <div className="dropdown">
                  <Nav.Link href="#/login" className="btn">
                    <FontAwesomeIcon className="nav-icon account" icon={faUser}/>
                      <div className="dropdown-content">
                        <a href="#/login">Login</a>
                      </div>
                  </Nav.Link>
                </div>

                  <Nav.Link href="#/cart" className="btn">
                    <FontAwesomeIcon className="nav-icon cart" icon={faShoppingCart}/>
                  </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <HashRouter> 
          {/* HashRouter: using the string after # to decide which page the user are going */}
          <Switch>
            <Route exact path="/">
              <ProductListingPage/>
            </Route>
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
              <CheckoutPage/>
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/thankyou">
              <ThankyouPage/>
            </Route>
          </Switch>
        </HashRouter>

        {/* <footer>
          <Container id="footer-container">
            <div id="footer-content">
              <Row>
                <Col md={6}>
                  <div>Ventail Company Ltd.</div>
                </Col>
                <Col md={6}>
                  <div>Contact Us</div>
                </Col>
              </Row>
              <span className="copyright">Copyright @ {year}</span>
            </div>
          </Container>
        </footer> */}
        <footer className="site-footer">
          <div className="container">

            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About</h6>
                <p className="text-justify">Ventail Company Ltd. <br/><i>A Bicycle eCommerce </i><br/> Created by Nikki Ip</p>
              </div>
              <div className="col-xs-6 col-md-3">
                <h6>Categories</h6>
                <ul className="footer-links">
                  <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>

                </ul>
              </div>
              <div className="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li><a href="http://scanfcode.com/about/">About Us</a></li>
                  <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                  <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Weather</a></li>
                </ul>
              </div>
            </div>
            <hr/>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">Copyright @ {year} All Rights Reserved by Nikki.
                </p>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  {/* <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                  <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li> */}
                  <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
                </ul>
              </div>
            </div>
          </div>
          </footer>
      </div>
    );
  }
}

