import { Component, Inject } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { NavComponent } from '../../nav/nav.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule, HeaderComponent,NavComponent,FooterComponent,ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  public products: Product[] = [];  
  public categoryId: number = 0;    
  
  

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'))
    this.listProductsByCategory(this.categoryId);
  }

  
  private listProductsByCategory(id_category : number) : void{
    if(id_category){
      this.productService.getProductsByCategory(id_category).subscribe({
        next : (data : Product[]) => {
          this.products = data;
        },
        error : (error : any) => {
          console.log(error);
        },
        complete : () => {
          console.log("completed");
        }
      });
    }
  }

}
