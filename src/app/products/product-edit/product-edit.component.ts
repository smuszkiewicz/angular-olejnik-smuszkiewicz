import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  private initForm() {
    let productName = '';
    let productImagePath = '';
    let productDesc = '';
    let productPrice = 0;

    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      productName = product.name;
      productImagePath = product.imagePath;
      productDesc = product.desc;
      productPrice = product.price;
    }

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
