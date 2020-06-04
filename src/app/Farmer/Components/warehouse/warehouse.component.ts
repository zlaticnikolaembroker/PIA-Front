import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  private lastSortingParameter: string = '';
  products: [];

  allProducts: [];

  //filter inputs
  filterName: string;
  filterAmountMin: number;
  filterAmountMax: number;
  filterCompanyName: string;

  constructor(private cookieService: CookieService, private router: Router, private http: HttpClient) {
    this.http.get('http://localhost:3000/farmer/products/' + +this.cookieService.get('garden_id')).subscribe((data: []) => {
        this.products = data;
        this.allProducts = data;
    });
   }

  ngOnInit(): void {
  }

  onlineShopClicked() {
    this.router.navigate(['/farmer/online_shop'])
  }

  currentOrdersClicked(){
    this.router.navigate(['/farmer/orders'])
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
    })
    this.lastSortingParameter =  this.lastSortingParameter == field ? null : field;
  }

  handleFilterChange() {
    this.products = this.allProducts;
    if (this.filterName) {
      //@ts-ignore
      this.products = this.products.filter((product) => {
        //@ts-ignore
        return product.name.includes(this.filterName);
      });
    }
    if (this.filterAmountMax && this.filterAmountMin && (!isNaN(this.filterAmountMax) && !isNaN(this.filterAmountMin))) {
      //@ts-ignore
      this.products = this.products.filter((product) => {
        //@ts-ignore
        return product.amount >= this.filterAmountMin && product.amount <= this.filterAmountMax;
      });
    }

    if (this.filterCompanyName){
      //@ts-ignore
      this.products = this.products.filter((product) => {
        //@ts-ignore
        return product.fullname.includes(this.filterCompanyName);
      });
    }
  }

}
