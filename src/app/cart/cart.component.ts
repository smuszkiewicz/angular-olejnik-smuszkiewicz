import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';

import { CartService } from './cart.service';

@Component({
  selector: 'cart-list',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.subscription = this.cartService.productsChanged
    .subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.cartService.startedEditing.next(index);
  }
}
