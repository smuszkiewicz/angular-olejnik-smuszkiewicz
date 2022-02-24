import { Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private productService: ProductService, private afs: Firestore) {}

  prodRef = collection(this.afs, 'products');

  fetchProducts() {
    const products = [];
    getDocs(this.prodRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        this.productService.setProducts(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
