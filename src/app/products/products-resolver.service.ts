import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private productsService: ProductService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.productsService.getProducts();

    if (products.length === 0) {
      return this.dataStorageService.fetchProducts();
    } else {
      return products;
    } 
  }
}
