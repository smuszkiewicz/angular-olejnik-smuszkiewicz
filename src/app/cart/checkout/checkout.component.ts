import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let fName: string = '';
    let lName: string = '';
    let city: string = '';
    let street: string = '';
    let code: string = '';

    this.checkoutForm = new FormGroup({
      fName: new FormControl(fName, Validators.required),
      lName: new FormControl(lName, Validators.required),
      city: new FormControl(city, Validators.required),
      street: new FormControl(street, Validators.required),
      code: new FormControl(code, Validators.required),
    });
  }

  onSubmit() {
    this.cartService.submitOrderHandler(this.checkoutForm.value);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
