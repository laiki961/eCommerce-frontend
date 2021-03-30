export type ProductItemDto = {
    productId: number,
    productName: string,
    description: string,
    price: number,
    imageUrl: string
};

export type ProductListResponseDto = PoductItemDto[];

export type ProductDetailsResponseDto = ProductItemDto;

export type ShoppingCartItemResponseDto = {
    [key:number]: ProductItemDto
}

///////////////////////////////////
export type TransactionItemDto ={
    details: ProductItemDto,
    quantity: number,
    subtotal: number
}

export type TransactionDto = {
    transactionId: number,
    items: TransactionItemDto[],
    total: number,
    status: "initiated" | "success" | "fail"
}

export type CheckoutResponseDto = TransactionDto;
export type TransactionResponseDto = TransactionDto;
///////////////////////////////////

export type LoginDto ={
    userId: number,
    email: string,
    password: string
};

export type LoginResponseDto = {
    [key:number]: LoginDto 
}

///////////////////////////////////

export type ShoppingCartItemDto ={
    productId: number, 
    quantity: number
}

///////////////////////////////////
export type CategoryResponseDto ={
    id: string,
    name: string
}