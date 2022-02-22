import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from './cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Input() index: number;
  @Input() amount: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  onAdd(id: number, name: string, price: number, amount: number) {
    this.cartService.addCartItem(id, name, price, amount);
  }

  onRemove(id: number) {
    this.cartService.removeCartItem(id);
  }
}
