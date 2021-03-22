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
          </Switch>
        </HashRouter>

        <footer>
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
        </footer>
      </div>
    );
  }
}

