export interface CartItem {
    id?: number;
    userEmail: string;
    product: {
        id: number;
    };
    quantity: number;
};