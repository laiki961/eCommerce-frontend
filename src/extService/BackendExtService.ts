import React from 'react';
import { Login, ProductItem, ProductList, ProductMap, Transaction } from '../domain/backendDos';
import mockProductList from './products.json';
import mockProductDetails from './productDetails.json';
import mockShoppingCartItems from './shoppingCartItems.json';
import mockCheckout from './checkout.json';
import mockLoginUser from './loginUser.json';
import { CheckoutResponseDto, LoginResponseDto, ProductDetailsResponseDto, ProductListResponseDto, ShoppingCartItemResponseDto, TransactionResponseDto } from '../domain/dto/backendDtos';
import { ShoppingCartItem } from '../domain/shoppingCartDos';
import axios from 'axios';

export default class BackendExtService{
    // static getProductList(callback: (data: ProductList)=> void){
    //     new Promise((resolve, reject) => {
    //         // Step 1: in the new world
    //         setTimeout(() => {
    //             // Step 1 siccess, bring mockProductList to the next step
    //             resolve(mockProductList as ProductListResponseDto); //function
    //         }, 2000); //number
    //     // data = mockProduct in the step 1
    //     }).then(data => {
    //         // Step 2
    //         // callback refers to onLoadedProductList
    //         callback(data as ProductList);
    //     })
    // }

    static getProductList(callback: (data: ProductList) =>void){
        axios.get<ProductListResponseDto>("http://localhost:8080/product/all")
            .then(response => {
                callback(response.data as ProductList);
            })
    }

    // static getProductDetails(callback: (data: ProductItem) => void){
    //     new Promise((resolve, reject)=> {
    //         setTimeout(()=>{
    //             resolve(mockProductDetails); // mockProductDetails <- dto: ProductDetailsResponseDto
    //         }, 1000);
    //     }).then(data => {  //data as ProductItem  i.e. data: ProductDetailsResponseDto (dto convert to do)
    //          callback(data as ProductItem);
    //     })
    // }

    static getProductDetails(productId: number, callback: (data: ProductItem) => void){
        axios.get<ProductDetailsResponseDto>("http://localhost:8080/product/details?productId="+ productId)
            .then(response => {
                callback(response.data as ProductItem);
            })
    }


    static getShoppingCartItems(productIds: string[], callback:(data: ProductMap)=> void){ //productIds should from database
        // new Promise((resolve, reject)=> {
        //     setTimeout(() => {
        //         resolve(mockShoppingCartItems as ShoppingCartItemResponseDto); 
        //     },1000);
        // }).then(data =>{
        //     callback(data as ProductMap);

        axios.post<ShoppingCartItemResponseDto>('http://localhost:8080/product/byIds', productIds)
            .then(response =>{
                callback(response.data as ProductMap)
            })

            //////////////////////////////////////////////////////////
            // One day if your DO is finally mistach with the DTO   //
            // callback({                                           //
            //     productName: data.name,                          //
            //     productPrice: data.price,                        //
            //     productDescription: data.description,            //
            //     ...                                              //
            // })                                                   //
            //////////////////////////////////////////////////////////
        // })
    }

    static checkout(items: ShoppingCartItem[], callback: (data: Transaction) => void){
        // new Promise((resolve, reject)=> {
        //     setTimeout(() => {
        //         resolve(mockCheckout as CheckoutResponseDto); 
        //     },1000);
        // }).then(data =>{
        //     callback(data as Transaction);
        // });
        axios.post<CheckoutResponseDto>('http://localhost:8080/transaction', items)
        .then(response =>{
            callback(response.data as Transaction)
        })
    }

    static getTransaction(transactionId: number, callback:(data: Transaction) => void){
        // new Promise((resolve, reject)=> {
        //     setTimeout(() => {
        //         resolve(mockCheckout as CheckoutResponseDto); 
        //     },1000);
        // }).then(data =>{
        //     callback(data as Transaction);
        // });
        axios.get<TransactionResponseDto>('http://localhost:8080/transaction/'+ transactionId)
        .then(response =>{
            callback(response.data as Transaction);
        });
    }

    //PostPaymentAPI

    static login(userId: number, callback:(data: Login)=> void){
        new Promise((resolve, reject)=> {
            setTimeout(() => {
                resolve(mockLoginUser as LoginResponseDto); 
            },1000);
        }).then(data =>{
            callback(data as Login);
        });
    }

}