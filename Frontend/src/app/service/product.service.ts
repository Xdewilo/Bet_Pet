import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http : HttpClient){}

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/all");

  }

  getProductsByCategory( id_category : number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/category/"+id_category);
  }
  
  getProductById(id : number ) : Observable<Product>{
    return this.http.get<Product>(this.baseUrl+"/"+id);
  }

  createProduct(product : Product) : Observable<Product>{
    return this.http.post<Product>(this.baseUrl+"/add",product);
  }

  updateProduct(product : Product) : Observable<Product>{
    return this.http.put<Product>(this.baseUrl+"/update",product);
  }

  deleteProduct(id : number) : Observable<Product>{
    return this.http.delete<Product>(this.baseUrl+"/delete/"+id);
  }

}