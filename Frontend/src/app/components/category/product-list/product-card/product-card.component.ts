import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../../model/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../service/auth.service';
import { CartItem } from '../../../../model/CartItem';
import { CartService } from '../../../../service/cart.service';
import { FavoriteService } from '../../../../service/favorite.service';
import { FavoritesItem } from '../../../../model/FavoritesItem';
import { NotificationService } from '../../../../service/notification.service';
import { NotificationComponent } from "../../../notification/notification.component";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  user: Observable<any>;
  
  @Input() productDetail!: Product;
  quantity: number = 1;
  isFavorite: boolean = false;
  showFullDescription = false;

  

  constructor(private authService: AuthService) {
    this.user = this.authService.user$;
  }

  private notificationService = inject(NotificationService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);

  ngOnInit(): void {
    this.getFavorites();
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }


  getPrice() {
    return this.productDetail.price * 1.2;
  }

  addToCart(): void {
    this.user.subscribe(user => {
      if (user) {
        const cardItem: CartItem = {
          userEmail: user.email,
          product: {
            id: this.productDetail.id
          },
          quantity: this.quantity
        };

        this.cartService.addToCart(cardItem).subscribe({
          next: (data: String) => {
            console.log(data);
          },
          error: (error) => {
            console.log("Error: " + error);
          },
          complete: () => {
            console.log("Producto agregado al carrito");
          }

        });

      }
    });
  }
  
  removeFromFavorite(): void {
    this.user.subscribe(user => {
      if(user){
        this.favoriteService.getFavoritesByUser(user.email).subscribe({
          next:(data : FavoritesItem[]) => {
            data.forEach(favorite =>{
              if(favorite.product.id ===this.productDetail.id){
                this.favoriteService.removeFromFavorites(favorite.id!).subscribe({
                  next : (data : String) => {
                    console.log(data);
                  },
                  error : (error : any) => {
                    console.log("Error: " + error);
                  },
                  complete : () => {
                    console.log("Producto removido de favoritos");
                  }
                });
              }
            });
          },
        }); 
      }
    });       
          
  }

  addToFavorite(): void {
    this.user.subscribe(user => {
      if (user) {
        const favoriteItem: FavoritesItem = {
          userEmail: user.email,
          product: {
            id: this.productDetail.id
          }
        };

        this.favoriteService.addToFavorites(favoriteItem).subscribe({
          next: (data: string) => {
            console.log(data);
          },
          error: (error) => {
            console.log("Error: " + error);
          },
          complete: () => {
            console.log("Producto agregado a favoritos");
          }
        });
      }
    });
  }



  getFavorites(): void {
    this.user.subscribe(user => {
      if (user) {
        this.favoriteService.getFavoritesByUser(user.email).subscribe({
          next: (data: FavoritesItem[]) => {
            data.forEach(favorite => {
              if (favorite.product.id === this.productDetail.id) {
                this.isFavorite = true;
              }
            });
          },
          error: (error) => {
            console.log("Error: " + error);
          },
          complete: () => {
            console.log("Favoritos obtenidos");
          }
        });
      }
    }
    );
  }

  toggleFavorite(){
    if(this.isFavorite){
      this.isFavorite = false;
      this.removeFromFavorite();
      this.notificationService.show("Producto removido de favoritos", "error");
    }else{
      this.isFavorite = true;
      this.addToFavorite();
      this.notificationService.show("Producto agregado a favoritos", "success");
    }
  }
  increaseQuantity() {
    if (this.quantity < this.productDetail.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
