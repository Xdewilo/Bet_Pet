import { Component, Input } from '@angular/core';
import { FavoriteService } from '../../service/favorite.service';
import { Favorites } from '../../model/Favorites';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
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
    ]
})
export class FavoriteComponent {
    @Input() userEmail!: string;
    favoriteItems: Favorites[] = [];
    isModalOpen = false;
    isLoading = false;
  
    constructor(private favoriteService: FavoriteService) {}
  
    ngOnInit(): void {
      this.loadFavorite();
    }
  
    loadFavorite(): void {
      this.isLoading = true;
      this.favoriteService.getFavoritesByUser(this.userEmail)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (fav: Favorites[]) => {
            this.favoriteItems = fav;
          },
          error: (error) => {
            console.error('Error loading cart:', error);
          }
        });
    }
  
    removeFromFavorite(favoriteId: number): void {
      const itemIndex = this.favoriteItems.findIndex(item => item.id === favoriteId);
      if (itemIndex > -1) {
        const updatedFavorite = [...this.favoriteItems];
        updatedFavorite.splice(itemIndex, 1);
        this.favoriteItems = updatedFavorite;
      }
  
      this.favoriteService.removeFromFavorites(favoriteId)
        .subscribe({
          next: () => {
            console.log('Item removed from favorites');
          },
          error: (error : any) => {
            console.error('Error removing item from favorites:', error);
          }
        });
    }
  
    toggleModal(): void {
      this.isModalOpen = !this.isModalOpen;
    }
}
