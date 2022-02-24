import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
@Injectable({ providedIn: 'root' })
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  isAuthenticated = false;
  isAdmin: boolean;
  private subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.product = this.productService.getProduct(this.id);
    });

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });

    this.subscription = this.authService.isAdminChanged.subscribe(
      (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      }
    );
  }

  onAddToCart() {
    this.productService.addProductToCart(this.product, 1);
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }
}
