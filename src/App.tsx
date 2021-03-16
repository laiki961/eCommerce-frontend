import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ShoppingCartService from './service/ShoppingCartService';
import CheckoutPage from './ui/page/CheckoutPage';
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
    return (
      <div className="App">
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#">Ventail</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                  <Nav.Link href="#/cart">
                    <FontAwesomeIcon className="icon" icon={faShoppingCart}/>
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
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

