import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  private lastSortingParameter: string = '';
  constructor(private http: HttpClient) { }
  products;
  ngOnInit(): void {
    this.http.get('http://localhost:3000/farmer/online_shop').subscribe((data) => {
          this.products = data;
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

}
