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

    plusQuantity(productId: number){
        let quantity = 1;

        this.shoppingCart[productId] = {
            productId: productId,
            quantity: quantity++
        };
    }

    minusQuantity(productId: number){
        let quantity = 1;

        this.shoppingCart[productId] = {
            productId: productId,
            quantity: quantity--
        };
    }


    addToCart(productId: number, quantity: number){
        if(this.shoppingCart[productId]){
            return;
        }
        
        this.shoppingCart[productId] = {
            productId: productId,
            quantity: quantity
        };

        LocalStorageUtil.setValue(this.shoppingCartKey, this.shoppingCart);
    }

    // addToCart(productId: number){
    //     if(this.shoppingCart[productId]){
    //         return;
    //     }
        
    //     this.shoppingCart[productId] = {
    //         productId: productId,
    //         quantity: 1
    //         //quantity: depends the number on the box
    //     };

    //     LocalStorageUtil.setValue(this.shoppingCartKey, this.shoppingCart);
    // }

    removeFromCart(productId: number){
        delete this.shoppingCart[productId];
        LocalStorageUtil.setValue(this.shoppingCartKey, this.shoppingCart);
    }

    getCartItems(){
        return this.shoppingCart;
    }
    


}