import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsList: Observable<Product[]> = new Observable<Product[]>();
  firestore: Firestore = inject(Firestore);

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
      return productsList;
    } catch (error) {
      console.error('Error al obtener productos: ', error);
      throw error;
    }
  }
}
