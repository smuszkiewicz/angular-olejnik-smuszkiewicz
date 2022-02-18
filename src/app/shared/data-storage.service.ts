import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private productService: ProductService) {}

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
    return this.http
      .get<Product[]>(
        'https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/products.json'
      )
      .pipe(
        map((products) => {
          return products.map((product) => {
            return {
              ...product
            };
          });
        }),
        tap(products => {
            this.productService.setProducts(products);
        })
      )
  }
}
