import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  storeProducts() {
    const products = this.productService.getProducts();
    this.http
      .put(
        'https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/products.json',
        products
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchProducts() {
    this.http
      .get<Product[]>(
        'https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/products.json'
      )
      .subscribe((loadedProducts) => {
        const products = [];
        for (const key in loadedProducts) {
          products.push({
            id: key,
            name: loadedProducts[key].name,
            imagePath: loadedProducts[key].imagePath,
            desc: loadedProducts[key].desc,
            price: loadedProducts[key].price,
          });
        }
        this.productService.setProducts(products);
      });
  }

  fetchProductss() {
    console.log('tu');
    this.http
      .get<Product[]>(
        'https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((products) => {
          return console.log(products);
        })
      );
  }
}
