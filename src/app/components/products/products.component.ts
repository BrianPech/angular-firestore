import { Component, EventEmitter, Output } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, ProductListComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  notifyReloadProducts: boolean = false;

  reciveReloadProducts(event: boolean) {
    this.notifyReloadProducts = event;
    setTimeout(() => {
      this.notifyReloadProducts = false; // Reinicia el valor para futuras notificaciones
    });
  }

  onProductDeleted() {
    this.notifyReloadProducts = true; // Notifica al hijo 2 para recargar productos
  }
}
