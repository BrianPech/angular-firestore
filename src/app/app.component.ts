import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ProductsComponent],
})
export class AppComponent {}
