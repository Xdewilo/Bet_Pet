import { Product } from "./product";

export interface Favorites {
    id: number;
    userEmail: string;
    product: Product;
  }