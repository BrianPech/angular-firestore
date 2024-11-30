import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() notifyReloadProducts: boolean = false;
  @Output() productDeleted = new EventEmitter<boolean>();
  productsList: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['notifyReloadProducts'] &&
      changes['notifyReloadProducts'].currentValue
    ) {
      this.loadProducts();
    }
  }

  onDelete(product: Product) {
    this.productService.deleteProduct(product.$key!).then(() => {
      this.productDeleted.emit(true);
    });
  }

  loadProducts() {
    this.productService.getProducts().then((products) => {
      this.productsList = products;
    });
  }
}
