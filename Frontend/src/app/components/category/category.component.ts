import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,MatIconModule,RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: any[] = [
    { icon: 'alim-humedos.png', name: 'Alim. Húmedos', type: 'Perros', color: 'red' },
    { icon: 'alim-secos.png', name: 'Alim. Secos', type: 'Perros', color: 'blue' },
    { icon: 'snack.png', name: 'Snack', type: 'Gatos', color: 'pink' },
    { icon: 'transporte.png', name: 'Transporte', type: 'Perros', color: 'blue' },
    { icon: 'suplementos.png', name: 'Suplementos', type: 'Gatos', color: 'pink' },
    { icon: 'salud.png', name: 'Salud', type: 'Perros', color: 'blue' },
    { icon: 'juguetes.png', name: 'Juguetes', type: 'Gatos', color: 'pink' },
    { icon: 'perfumes.png', name: 'Perfumes', type: 'Gatos', color: 'blue' },
    { icon: 'sanitarios.png', name: 'Sanitarios', type: 'Gatos', color: 'pink' },
    { icon: 'juguetes.png', name: 'Juguetes', type: 'Perros', color: 'blue' }
  ];

}
