import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

import { CartService } from '../cart/cart.service';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  productsChanged = new Subject<Product[]>();
  private products: Product[] = [];

  prodRef = collection(this.afs, 'products');

  constructor(private cartService: CartService, private afs: Firestore) {}

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products.slice()[index];
  }

  addProductToCart(product: Product, amount: number) {
    this.cartService.addCartItem(
      product.id,
      product.name,
      product.price,
      amount
    );
  }

  addProduct(product: Product) {
    setDoc(doc(this.prodRef), {
      name: product.name,
      desc: product.desc,
      imagePath: product.imagePath,
      price: product.price,
    }).catch((err) => console.log(err.message));
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }
}
