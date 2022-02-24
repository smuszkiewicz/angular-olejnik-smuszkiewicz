import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  subscription: Subscription;
  isAuthenticated = false;

  constructor(
    private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });

    this.dataStorageService.fetchProducts();

    this.subscription = this.ProductService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.products = this.ProductService.getProducts();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
