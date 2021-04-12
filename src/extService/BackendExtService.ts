import React from 'react';
import { Category, Login, ProductItem, ProductList, ProductMap, Review, Transaction } from '../domain/backendDos'; 
import mockLoginUser from './loginUser.json';
import { CategoryResponseDto, CheckoutResponseDto, CreateReviewRequestDto, LoginResponseDto, ProductDetailsResponseDto, ProductListResponseDto, ReviewResponseDto, ShoppingCartItemDto, ShoppingCartItemResponseDto, TransactionResponseDto } from '../domain/dto/backendDtos';
import axios from 'axios';
import config from '../config/config';

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


    //All products (previous)
    static getProductList(callback: (data: ProductList) =>void, categoryId?: string, search?: string){
        (categoryId)?(
            axios.get<ProductListResponseDto>(config().backend.baseUrl + "/public/product/"+ categoryId)
             .then(response => {
                 callback(response.data as ProductList);
            })
        ):(search)?(
            axios.get<ProductListResponseDto>(config().backend.baseUrl + "/public/product/all?productName="+ search)
             .then(response => {
                 callback(response.data as ProductList);
            })
        ):(
            axios.get<ProductListResponseDto>(config().backend.baseUrl + "/public/product/all")
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
        axios.get<CategoryResponseDto[]>(config().backend.baseUrl + "/public/category/all")
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
        axios.get<ProductDetailsResponseDto>(config().backend.baseUrl + "/public/product/details?productId="+ productId)
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

        axios.post<ShoppingCartItemResponseDto>(config().backend.baseUrl + '/public/product/byIds', productIds)
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
        axios.post<CheckoutResponseDto>(config().backend.baseUrl + '/transaction', items,{
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
        axios.get<TransactionResponseDto>(config().backend.baseUrl + '/transaction/'+ transactionId,{
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


    static completeTransaction(callback: ()=> void){
        new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                // Step 1 success, bring mockProductList to the next step
                resolve()//function
            }, 5000); //number
        // data = mockProduct in the step 1
        }).then(data => {
            // Step 2
            // callback refers to onLoadedProductList
            callback();
        })
    }


    static createNewReview(callback: (data: Review)=> void,  product: CreateReviewRequestDto){
        axios.post<ReviewResponseDto>(config().backend.baseUrl + "/public/review/", product)
        .then(response => {
            callback(response.data as Review);
       })
    }

    static fetchAllReviews(callback: (data: Review[]) => void, productId: string){
        axios.get<ReviewResponseDto[]>(config().backend.baseUrl + "/public/review/?productId=" + productId)
        .then(response => {
            callback(response.data as Review[]);
       })
    }

}