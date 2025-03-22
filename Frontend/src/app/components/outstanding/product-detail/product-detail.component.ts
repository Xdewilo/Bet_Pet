import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product';
import { CartService } from '../../../service/cart.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { CartItem } from '../../../model/CartItem';
import { FavoriteService } from '../../../service/favorite.service';
import { FavoritesItem } from '../../../model/FavoritesItem';
import { NotificationComponent } from '../../notification/notification.component';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, NavComponent, FooterComponent, CommonModule, RouterModule, FormsModule, MatIconModule,NotificationComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  user: Observable<any>;
  quantity: number = 1;
  isFavorite: boolean = false;
  productId! : number;
  product! : Product;

  constructor(private authService: AuthService) {
      this.user = this.authService.user$;
    }

  private route= inject(ActivatedRoute)
  private productService= inject(ProductService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
      this.productId = Number(this.route.snapshot.paramMap.get('id'))

      this.getProductById(this.productId);
  }

  actualizarCantidad(cambio: number): void {
    this.quantity = Math.max(1, this.quantity + cambio);
  }

  getProductById(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
      },
      error: (error: any) => {
        console.log("Error: " + error);
      },
      complete: () => {
        console.log("Datos optenidos");
      }
    })
  }

  addToCart(): void {
    this.user.subscribe(user => {
      if (user) {
        const cardItem : CartItem = {
          userEmail: user.email,
          product: {
            id: this.product.id
          },
          quantity: this.quantity
        };

        this.cartService.addToCart(cardItem).subscribe({
          next: (data : String) => {
            console.log(data);
          },
          error: (error) => {
            console.log("Error: " + error);
          },
          complete: () => {
            console.log("Producto agregado al carrito");
            this.notificationService.show('Producto agregado al carrito', 'success');
          }

        });

      }
    });
  }
  addToFavorite(): void {
    this.user.subscribe(user => {
      if (user) {
        const favoriteItem : FavoritesItem = {
          userEmail: user.email,
          product: {
            id: this.product.id
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

  
  removeFromFavorite(): void {
    this.user.subscribe(user => {
      if(user){
        this.favoriteService.getFavoritesByUser(user.email).subscribe({
          next:(data : FavoritesItem[]) => {
            data.forEach(favorite =>{
              if(favorite.product.id ===this.product.id){
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
  toggleFavorite(){
    if(this.isFavorite){
      this.isFavorite = false;
      this.removeFromFavorite();
      this.notificationService.show('Producto removido de favoritos', 'error');
    }else{
      this.isFavorite = true;
      this.addToFavorite();
      this.notificationService.show('Producto agregado a favoritos', 'success');
    }
  }
}
