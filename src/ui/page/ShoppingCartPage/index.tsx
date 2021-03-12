import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Breadcrumb, Button, Container, Table } from 'react-bootstrap';
import { isTemplateTail } from 'typescript';
import { ProductMap, Transaction } from '../../../domain/backendDos';
import { ShoppingCartItem } from '../../../domain/shoppingCartDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import ProductList from '../../component/ProductList';
import './style.css';

type Props ={ 
    shoppingCartService: ShoppingCartService
};
type State ={ //maintain by ourself
    shoppingCartItems?: ProductMap
};

export default class ShoppingCartPage extends React.Component<Props, State>{
    state = {} as State; //inital State

    constructor(props: Props){
        super(props);

        this.onLoadedShoppingCartItems = this.onLoadedShoppingCartItems.bind(this);
        this.onClickRemoveFromCartButton = this.onClickRemoveFromCartButton.bind(this);
        this.onClickCheckoutButton = this.onClickCheckoutButton.bind(this);
    }

    componentDidMount(){
        const cart = this.props.shoppingCartService.getCartItems();
        const productIds = Object.keys(cart); //to find all keys from an Object and return an array
        BackendExtService.getShoppingCartItems(productIds, this.onLoadedShoppingCartItems);
    }

    onLoadedShoppingCartItems(data: ProductMap){
        this.setState({
            shoppingCartItems: data
        });
    }

    // onClickRemoveFromCartButton(productId: number){}
    // renderShoppingCartItems(){}

    onClickCheckoutButton(){
        const checkoutItems: ShoppingCartItem[] = [];
        for (let productId of Object.keys(this.state.shoppingCartItems!)){
            checkoutItems.push({
                productId: +productId
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

        const shoppingCartItems = this.state.shoppingCartItems!; 
        delete shoppingCartItems[productId];

        this.setState({
            shoppingCartItems: shoppingCartItems
        });
    }

    renderShoppingCartTotalPrice(){
        let totalPrice = 0;
        if(!this.state.shoppingCartItems){
            return null;
        }else{
            for(let productId of Object.keys(this.state.shoppingCartItems)){
            totalPrice += this.state.shoppingCartItems[+productId].price;
            }
        }
        return (
            <section>
                <hr/>
                <h3>Total: ${totalPrice}</h3>
                <Button variant="primary" onClick={this.onClickCheckoutButton}>Checkout</Button>
            </section>
        )
    }

    render(){        
        return(
            <Container>
                <Breadcrumb>
                    <Breadcrumb.Item href="#/">All Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
                </Breadcrumb>
                
                {/* {moved the table to productList} */}
                <ProductList
                    shouldShowRemoveButton={true}
                    displayItems={this.state.shoppingCartItems}
                    onClickRemoveFromCartButton={this.onClickRemoveFromCartButton}
                />
                {this.renderShoppingCartTotalPrice()}
            </Container>
        )
    }
}