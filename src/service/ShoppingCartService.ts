import React from 'react';
import { ShoppingCartItem } from '../domain/shoppingCartDos';
import LocalStorageUtil from '../util/localStorageUtil';

export default class ShoppingCartService{
    shoppingCartKey = "cart";
    shoppingCart: {[key: number]: ShoppingCartItem} = {}; //contain the latest shoppingCartItems

    constructor(){
        this.shoppingCart = LocalStorageUtil.getValue(this.shoppingCartKey);
        if(!this.shoppingCart){
            this.shoppingCart = {};
        }
    }

    updateCart(productId: number, quantity: number){
        this.shoppingCart[productId] = {
            productId: productId,
            quantity: quantity
        };
        LocalStorageUtil.setValue(this.shoppingCartKey, this.shoppingCart);
    }

    removeFromCart(productId: number){
        delete this.shoppingCart[productId];
        LocalStorageUtil.setValue(this.shoppingCartKey, this.shoppingCart);
    }

    getCartItems(){
        return this.shoppingCart;
    }
    


}