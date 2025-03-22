// cart.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../model/Cart';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('itemAnimation', [
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1 }),
        animate('200ms ease-out', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ],

})
export class CartComponent implements OnInit {
  @Input() userEmail!: string;
  cartItems: Cart[] = [];
  isModalOpen = false;
  isLoading = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCartByUser(this.userEmail)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (cart: Cart[]) => {
          this.cartItems = cart;
        },
        error: (error) => {
          console.error('Error loading cart:', error);
        }
      });
  }

  removeFromCart(CartId: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.id === CartId);
    if (itemIndex > -1) {
      const updatedCart = [...this.cartItems];
      updatedCart.splice(itemIndex, 1);
      this.cartItems = updatedCart;
    }

    this.cartService.removeFromCart(CartId)
      .subscribe({
        next: () => {
        },
        error: (error) => {
          console.error('Error removing item from cart:', error);
        }
      });
  }

  get totalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }
}