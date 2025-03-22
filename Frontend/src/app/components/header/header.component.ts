import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CartComponent } from '../cart/cart.component';
import { FavoriteComponent } from '../favorite/favorite.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartComponent, FavoriteComponent],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ 
          opacity: 0,
          transform: 'scale(0.95) translateY(-10px)'
        }),
        animate('200ms ease-out', style({ 
          opacity: 1,
          transform: 'scale(1) translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ 
          opacity: 0,
          transform: 'scale(0.95) translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class HeaderComponent {
  user: Observable<any>;
  email : string = '';

  menuOpen = false;
  router : Router = inject(Router);



  constructor(private authService: AuthService, private eRef: ElementRef) {
    this.user = this.authService.user$;
    this.user.subscribe(user => {
      if (user) {
        this.email = user.email;
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }
}