import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../hero/hero.component';
import { CategoryComponent } from '../category/category.component';
import { NavComponent } from '../nav/nav.component';
import { OutstandingComponent } from '../outstanding/outstanding.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    HeroComponent,
    CategoryComponent,
    NavComponent,
    OutstandingComponent
],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
}