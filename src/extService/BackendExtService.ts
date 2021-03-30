import React from 'react';
import { Category, Login, ProductItem, ProductList, ProductMap, Transaction } from '../domain/backendDos'; 
import mockLoginUser from './loginUser.json';
import { CategoryResponseDto, CheckoutResponseDto, LoginResponseDto, ProductDetailsResponseDto, ProductListResponseDto, ShoppingCartItemDto, ShoppingCartItemResponseDto, TransactionResponseDto } from '../domain/dto/backendDtos';
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


    //All products
    static getProductList(callback: (data: ProductList) =>void, categoryId?: string){
        (!categoryId)?(
            axios.get<ProductListResponseDto>("http://localhost:8080/public/product/all")
            .then(response => {
                callback(response.data as ProductList);
            })
        ):(
            axios.get<ProductListResponseDto>("http://localhost:8080/public/product/"+ categoryId)
            .then(response => {
                callback(response.data as ProductList);
            })
        )
        
    }

    
    // //Specific Categoty Product List
    // static getCategoryProductList(categoryId: string, callback: (data: ProductList) =>void){
    //     axios.get<ProductListResponseDto>("http://localhost:8080/public/product/"+ categoryId)
    //         .then(response => {
    //             callback(response.data as ProductList);
    //         })
    // }


    static getCategoryList(callback: (data: Category[]) =>void){
        axios.get<CategoryResponseDto[]>("http://localhost:8080/public/category/all")
            .then(response => {
                callback(response.data as Category[]);
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
        axios.get<ProductDetailsResponseDto>("http://localhost:8080/public/product/details?productId="+ productId)
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

        axios.post<ShoppingCartItemResponseDto>('http://localhost:8080/public/product/byIds', productIds)
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

    static checkout(idToken: string, items: ShoppingCartItemDto[], callback: (data: Transaction) => void){
        // new Promise((resolve, reject)=> {
        //     setTimeout(() => {
        //         resolve(mockCheckout as CheckoutResponseDto); 
        //     },1000);
        // }).then(data =>{
        //     callback(data as Transaction);
        // });
        axios.post<CheckoutResponseDto>('http://localhost:8080/transaction', items,{
            headers: {
                Authorization: "Bearer " + idToken
            }
        })
        .then(response =>{
            callback(response.data as Transaction)
        })
    }

    static getTransaction(idToken: string, transactionId: number, callback:(data: Transaction) => void){
        // new Promise((resolve, reject)=> {
        //     setTimeout(() => {
        //         resolve(mockCheckout as CheckoutResponseDto); 
        //     },1000);
        // }).then(data =>{
        //     callback(data as Transaction);
        // });
        axios.get<TransactionResponseDto>('http://localhost:8080/transaction/'+ transactionId,{
            headers: {
                Authorization: "Bearer " + idToken
            }
        })
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