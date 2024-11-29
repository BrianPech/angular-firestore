import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, ProductListComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {}
