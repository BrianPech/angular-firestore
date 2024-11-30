import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  @Output() reloadProducts: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(protected productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts();
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null) {
      this.productService.insertProduct(productForm.value).then(() => {
        console.log('Producto insertado con éxito', { productForm });
      });
    } else {
      this.productService.updateProduct(productForm.value).then(() => {
        console.log('Producto actualizado con éxito', { productForm });
      });
    }
    this.resetForm(productForm);
    this.notifyReloadProducts();
  }

  notifyReloadProducts() {
    this.reloadProducts.emit(true); // Emitimos true
  }

  resetForm(productForm: NgForm) {
    if (productForm != null) {
      productForm.reset();
      console.log('Formulario reseteado');

      this.productService.selectedProduct = new Product();
      console.log(
        'Producto seleccionado reseteado',
        this.productService.selectedProduct
      );
    }
  }
}
