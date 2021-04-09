import React from 'react';
import { Breadcrumb, Button, Container } from 'react-bootstrap';
import { ProductMap, ShoppingCartProduct, Transaction } from '../../../domain/backendDos';
import { ShoppingCartItemDto } from '../../../domain/dto/backendDtos';
import BackendExtService from '../../../extService/BackendExtService';
import AuthService from '../../../service/AuthService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import CartList from '../../component/CartList';

import './style.css';

type Props ={ 
    shoppingCartService: ShoppingCartService
};
type State ={ //maintain by ourself
    shoppingCartProduct?: ShoppingCartProduct
};

export default class ShoppingCartPage extends React.Component<Props, State>{
    state = {} as State; //inital State

    constructor(props: Props){
        super(props);

        this.onLoadedShoppingCartItems = this.onLoadedShoppingCartItems.bind(this);
        this.onClickRemoveFromCartButton = this.onClickRemoveFromCartButton.bind(this);
        this.onClickCheckoutButton = this.onClickCheckoutButton.bind(this);
        this.onUpdatedQuantity = this.onUpdatedQuantity.bind(this);
    }

    componentDidMount(){
        const cart = this.props.shoppingCartService.getCartItems();
        const productIds = Object.keys(cart); //to find all keys from an Object and return an array
        BackendExtService.getShoppingCartItems(productIds, this.onLoadedShoppingCartItems);
    }

    onLoadedShoppingCartItems(data: ProductMap){
        this.setState({
            shoppingCartProduct: this.setQuantityintoShoppingCartProduct(data),
        });
    }

    setQuantityintoShoppingCartProduct(data: ProductMap){   
    const shoppingCartProduct: ShoppingCartProduct = {};
        for(let productId of Object.keys(data!)){
            shoppingCartProduct[+productId] = ({
                productId: +productId,
                productName: data![+productId].productName,
                description: data![+productId].description,
                price: data![+productId].price,
                imageUrl: data![+productId].imageUrls[0].imageUrl,
                quantity: this.props.shoppingCartService.shoppingCart[+productId].quantity
            })
        }
        return shoppingCartProduct;
    }

    onClickCheckoutButton(){
        const checkoutItems: ShoppingCartItemDto[] = [];
        for (let productId of Object.keys(this.state.shoppingCartProduct!)){
            checkoutItems.push({
                productId: +productId,
                quantity: this.props.shoppingCartService.shoppingCart[+productId].quantity
            });
        }
        if(AuthService.isSignedIn()){
            AuthService.getIdToken()
            .then((idToken) => {
                BackendExtService.checkout(idToken, checkoutItems, this.onCreatedTransaction);
            })
        //BackendExtService.checkout(checkoutItems, this.onCreatedTransaction);
        }else{
            alert("Please login in order to complete the checkout process")
            window.location.href = "#/login"
        }
    }

    onCreatedTransaction(data: Transaction){
        //widnow = browser's function
        window.location.href = "#/checkout/" + data.transactionId;
    }

    onClickRemoveFromCartButton(productId: number){
        this.props.shoppingCartService.removeFromCart(productId);

        //...this.props.displayItems means take everything inside out
        // and put them into the new object
        // const shoppingCartItems = {
        //     ...this.state.shoppingCartItems
        // };
        // delete shoppingCartItems[productId]

        const shoppingCartProduct = this.state.shoppingCartProduct!; 
        delete shoppingCartProduct[productId];

        this.setState({
            shoppingCartProduct: shoppingCartProduct
        });
    }

    onUpdatedQuantity(productId: number, quantity: number) {
        this.props.shoppingCartService.updateCart(productId, quantity);
        const shoppingCartProduct = this.state.shoppingCartProduct!;
        shoppingCartProduct[+productId].quantity = quantity;
        this.setState({shoppingCartProduct: shoppingCartProduct});
    }

    renderShoppingCartTotalPrice(){
        let totalPrice = 0;
        if(!this.state.shoppingCartProduct){
            return null;
        }else{
            for(let productId of Object.keys(this.state.shoppingCartProduct)){
            totalPrice += this.state.shoppingCartProduct[+productId].price * this.state.shoppingCartProduct[+productId].quantity;
            }
        }
        return (
            <section>
                <hr/>
                
                    <div className="price cart"><span className="priceTag cart">Total: $ </span>{totalPrice}</div>
                    <br/>
                    <Button variant="primary" onClick={this.onClickCheckoutButton}>Checkout</Button>
                
            </section>
        )
    }

    render(){      
        console.log(this.state.shoppingCartProduct);
        console.log(this.props.shoppingCartService.shoppingCart);

        return(
            <div className="content">
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="#/">All Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
                </Breadcrumb>
                
                <CartList
                    shouldEnableQuantityButton={true}
                    onUpdatedQuantity={this.onUpdatedQuantity}
                    displayItems={this.state.shoppingCartProduct}
                    shouldShowRemoveButton={true}
                    onClickRemoveFromCartButton={this.onClickRemoveFromCartButton}
                />
                {/* <ProductList
                    shouldShowRemoveButton={true}
                    displayItems={this.state.shoppingCartItems}
                    onClickRemoveFromCartButton={this.onClickRemoveFromCartButton}
                /> */}
                {this.renderShoppingCartTotalPrice()}
            </Container>
            </div>
        )
    }
}