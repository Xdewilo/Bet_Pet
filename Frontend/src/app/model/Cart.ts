import { Product } from "./product";

export interface Cart {
    id: number;
    userEmail: string;
    product: Product;
    quantity: number;
  }