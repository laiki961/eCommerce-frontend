import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Breadcrumb, Button, Container, Table } from 'react-bootstrap';
import { isTemplateTail } from 'typescript';
import { ProductMap, ShoppingCartProduct, Transaction } from '../../../domain/backendDos';
import { ShoppingCartItem } from '../../../domain/shoppingCartDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import ShoppingCartList from '../../component/ShoppingCartList';

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
                imageUrl: data![+productId].imageUrl,
                quantity: this.props.shoppingCartService.shoppingCart[+productId].quantity
            })
        }
        return shoppingCartProduct;
    }

    onClickCheckoutButton(){
        const checkoutItems: ShoppingCartItem[] = [];
        for (let productId of Object.keys(this.state.shoppingCartProduct!)){
            checkoutItems.push({
                productId: +productId,
                quantity: this.props.shoppingCartService.shoppingCart[+productId].quantity
            });
        }
        BackendExtService.checkout(checkoutItems, this.onCreatedTransaction)
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
                <h3><span>Total: $ {totalPrice}</span></h3>
                <Button variant="primary" onClick={this.onClickCheckoutButton}>Checkout</Button>
            </section>
        )
    }

    render(){      
        console.log(this.state.shoppingCartProduct);
        console.log(this.props.shoppingCartService.shoppingCart);

        return(
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="#/">All Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
                </Breadcrumb>
                
                <ShoppingCartList
                    onUpdatedQuantity={this.onUpdatedQuantity}
                    shouldShowRemoveButton={true}
                    displayItems={this.state.shoppingCartProduct}
                    onClickRemoveFromCartButton={this.onClickRemoveFromCartButton}
                />
                {/* <ProductList
                    shouldShowRemoveButton={true}
                    displayItems={this.state.shoppingCartItems}
                    onClickRemoveFromCartButton={this.onClickRemoveFromCartButton}
                /> */}
                {this.renderShoppingCartTotalPrice()}
            </Container>
        )
    }
}