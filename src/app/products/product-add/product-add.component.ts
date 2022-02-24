import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.initForm();
    });
  }

  onSubmit() {
    this.productService.addProduct(this.productForm.value);

    this.onCancel();
  }

  private initForm() {
    let productName = '';
    let productImagePath = '';
    let productDesc = '';
    let productPrice = 0;

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      imagePath: new FormControl(productImagePath, Validators.required),
      desc: new FormControl(productDesc, Validators.required),
      price: new FormControl(productPrice, Validators.required),
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
