import { Subject } from 'rxjs';

import { Product } from '../products/product.model';

export class CartService {
  productsChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();
  private products: Product[] = [
    new Product('Apples', 'pyszne', 'ght', 5),
    new Product('Aple', 'mniam', 'hot', 6),
  ];

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product: Product) {
    this.products.push(product)
    this.productsChanged.next(this.products.slice())
  }

  addProducts(products: Product[]) {
    this.products.push(...products)
    this.productsChanged.next(this.products.slice())
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct
    this.productsChanged.next(this.products.slice())
  }

  deleteProduct(index:number) {
    this.products.splice(index, 1)
    this.productsChanged.next(this.products.slice())
  }
}
