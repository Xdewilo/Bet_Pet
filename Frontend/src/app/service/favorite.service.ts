import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorites } from '../model/Favorites';
import { FavoritesItem } from '../model/FavoritesItem';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl = 'http://localhost:8080/api/favorites';
  private http = inject(HttpClient)

  getFavoritesByUser(userEmail : String): Observable<Favorites[]>{
    return this.http.get<Favorites[]>(this.baseUrl+"/"+userEmail);
  }

  addToFavorites(favoriteItem : FavoritesItem): Observable<any>{
    return this.http.post(this.baseUrl+"/add",favoriteItem, { responseType: 'text' });
  }

  removeFromFavorites(IdFavorite : number) : Observable<any>{
    return this.http.delete<Favorites>(this.baseUrl+"/"+IdFavorite);
  }

}
