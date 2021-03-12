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

///////////////
export type TransactionItem ={
    details: ProductItem,
    subtotal: number
}

export type Transaction = {
    transactionId: number,
    items: TransactionItem[],
    total: number,
    status: "initiated" | "success" | "fail"
}