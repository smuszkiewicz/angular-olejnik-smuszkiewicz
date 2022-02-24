import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

import { CartItem } from './cart-item/cart-item.model';

@Injectable()
export class CartService {
  itemsChanged = new Subject<CartItem[]>();
  private cartItems: CartItem[] = [];
  private totalAmount = 0;

  orderRef = collection(this.afs, 'orders');

  constructor(private afs: Firestore) {}

  getCartItems() {
    return this.cartItems.slice();
  }

  getCartItem(index: number) {
    return this.cartItems.slice()[index];
  }

  submitOrderHandler = (userData: []) => {
    const items = [];
    this.cartItems.map((item) => {
      items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        amount: item.amount,
      });
    });
    setDoc(doc(this.orderRef), {
      user: userData,
      orderedItems: items,
    }).catch((err) => console.log(err.message));
    this.cartItems = [];
  };

  addCartItem(id: string, name: string, price: number, amount: number) {
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

  removeCartItem(id: string) {
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
