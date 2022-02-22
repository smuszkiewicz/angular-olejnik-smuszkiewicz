import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Subject, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { CartItem } from './cart-item/cart-item.model';

@Injectable()
export class CartService {
  itemsChanged = new Subject<CartItem[]>();
  private cartItems: CartItem[] = [];
  private totalAmount = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCartItems() {
    return this.cartItems.slice();
  }

  getCartItem(index: number) {
    return this.cartItems.slice()[index];
  }

  submitOrderHandler = (userData) => {
    this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.post(
            'https://sklepik-olejnik-smuszkie-5edcf-default-rtdb.firebaseio.com/orders.json',
            JSON.stringify({
              user: userData,
              orderedItems: this.cartItems,
            }),
            {
              params: new HttpParams().set('auth', user.token),
            }
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
    this.cartItems = [];
  };

  addCartItem(id: number, name: string, price: number, amount: number) {
    const newItem = new CartItem(id, name, price, amount);

    const existingCartItemIndex = this.cartItems.findIndex(
      (product) => product.id === id
    );

    const existingCartItem = this.cartItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + amount,
      };
      this.cartItems[existingCartItemIndex] = updatedItem;
    } else {
      this.cartItems = this.cartItems.concat(newItem);
    }
    this.itemsChanged.next(this.cartItems.slice());
  }

  removeCartItem(id: number) {
    const existingCartItemIndex = this.cartItems.findIndex(
      (product) => product.id === id
    );
    const existingCartItem = this.cartItems[existingCartItemIndex];
    this.totalAmount = this.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      this.cartItems[existingCartItemIndex] = updatedItem;
    }
    this.itemsChanged.next(this.cartItems.slice());
  }
}
