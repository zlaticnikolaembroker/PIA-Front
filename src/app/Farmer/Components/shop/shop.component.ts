import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  showAll: boolean;
  showSeedlings: boolean;
  showPreparations: boolean;
  private lastSortingParameter: string = '';
  private allProducts;
  products;

  constructor(private http: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
    this.showAll = true;
    this.showPreparations = true;
    this.showSeedlings = true;
    this.http.get('http://localhost:3000/farmer/online_shop').subscribe((data) => {
          this.products = data;
          this.allProducts = data;
      });
  }

  sort(field) {
    this.products = this.products.sort((a, b) => {
      if (!a[field]) {
        return this.lastSortingParameter == field ? 1 : -1;
      }
      if (!b[field]) {
        return this.lastSortingParameter == field ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return this.lastSortingParameter == field ? -1 : 1;
      }
      if (a[field] < b[field]) {
        return this.lastSortingParameter == field ? 1 : -1;
      }
      return 0;
    });
    this.lastSortingParameter =  this.lastSortingParameter == field ? null : field;
  }

  handleShowPreparations() {
    this.showAll = this.showAll ? false : this.showAll;
    this.showPreparations = !this.showPreparations;
    if (this.showSeedlings && this.showPreparations) this.showAll = true;
    this.filterProductsToShow();
  }

  handleShowAll() {
    this.showPreparations = this.showSeedlings = this.showAll = !this.showAll;
    this.filterProductsToShow();
  }

  handleShowSeedlings() {
    this.showAll = this.showAll ? false : this.showAll;
    this.showSeedlings = !this.showSeedlings;
    if (this.showSeedlings && this.showPreparations) this.showAll = true;
    this.filterProductsToShow();
  }

  filterProductsToShow() {
    this.products = this.allProducts.filter((product) => {
      return (product.type == 'Seedling' && this.showSeedlings) || (product.type == 'Preparation' && this.showPreparations);
     })
  }

  productClicked(id) {
    this.router.navigate(['/farmer/online_shop/' + id])
  }

}
