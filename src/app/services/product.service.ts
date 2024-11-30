import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsList: Observable<Product[]> = new Observable<Product[]>();
  firestore: Firestore = inject(Firestore);
  selectedProduct: Product = new Product();

  constructor() {
    const productCollection = collection(this.firestore, 'products');
    this.productsList = collectionData<Product>(
      productCollection
    ) as Observable<Product[]>;
  }

  async getProducts(): Promise<Product[]> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      const querySnapshot = await getDocs(productsCollection);
      const productsList: Product[] = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        productsList.push({
          $key: doc.id,
          name: productData['name'],
          category: productData['category'],
          location: productData['location'],
          price: productData['price'],
        });
      });

      console.log('Productos obtenidos con éxito');
      console.log({ productsList });

      return productsList;
    } catch (error) {
      console.error('Error al obtener productos: ', error);
      throw error;
    }
  }

  async insertProduct(product: Product): Promise<void> {
    const productsCollection = collection(this.firestore, 'products');
    if (!product) return;

    try {
      addDoc(productsCollection, <Product>{
        name: product.name,
        category: product.category,
        location: product.location,
        price: product.price,
      }).then((documentReference: DocumentReference) => {
        return documentReference.id;
      });
    } catch (error) {
      console.error('Error al insertar producto: ', error);
      throw error;
    }
  }

  async updatePoduct(product: Product): Promise<void> {}

  async deleteProduct($key: string): Promise<void> {
    const productsCollection = collection(this.firestore, 'products');
    const querySnapshot = await getDocs(productsCollection);
    if (!$key) return;

    try {
      querySnapshot.forEach((doc) => {
        if (doc.id === $key) {
          console.log('Producto encontrado: ', doc.data(), doc.id);
          deleteDoc(doc.ref);
          console.log('Producto eliminado con éxito', $key);
        }
      });
    } catch (error) {
      console.error('Error al eliminar producto: ', error);
      throw error;
    }
  }
}
