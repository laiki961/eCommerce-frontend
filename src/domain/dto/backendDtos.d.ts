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
    subtotal: number
}

export type TransactionDto = {
    transactionId: number,
    items: TransactionItemDto[],
    total: number,
    status: "initiated" | "success" | "fail"
}

export type CheckoutResponseDto = TransactionDto;
///////////////////