import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../model/Cart';
import { Observable } from 'rxjs';
import { CartItem } from '../model/CartItem';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/cart';

  private http = inject(HttpClient);

  getCartByUser(userEmail: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/${userEmail}`);
  }

  addToCart(cardItem : CartItem): Observable<any> {
    return this.http.post(this.baseUrl+"/add", cardItem,  { responseType: 'text' });
  }

  removeFromCart(IdCart : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${IdCart}`);
  }
  
    
}
