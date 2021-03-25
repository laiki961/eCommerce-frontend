export type ShoppingCartProduct ={
    [key: number] : {
        productId: number,
        productName: string,
        description: string,
        price: number,
        imageUrl: string,
        quantity: number
    }
}

// export type ShoppingCartProduct ={
//     [key: number] : ProductItem & {quantity: number}
    
// }

export type ProductItem = {
    productId: number,
    productName: string,
    description: string,
    price: number,
    imageUrl: string
};

export type ProductList = PoductItem[];

export type ProductMap ={
    [key:number] : ProductItem
};

///////////////////////////////////
export type TransactionItem ={
    details: ProductItem,
    quantity: number,
    subtotal: number
}

export type Transaction = {
    transactionId: number,
    items: TransactionItem[],
    total: number,
    status: "initiated" | "success" | "fail"
}
///////////////////////////////////

export type Login ={
    userId: number,
    email: string,
    password: string
};

export type LoginResponse = {
    [key:number]: Login
}

///////////////////////////////////

export type PaymentDetails={
    creditCardNumber: string,
    expiryDate: string,
    cvv: string
}

export type PersonalInformation ={
    firstName: string,
    lastName: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    zip: string
}