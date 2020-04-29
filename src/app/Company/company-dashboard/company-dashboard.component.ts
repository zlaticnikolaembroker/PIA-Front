import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/Common/Types/product';
import { OrderDetails } from '../types/OrderDetails';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  products: Product[];
  orders: OrderDetails[];

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/company/products/' + this.cookieService.get('userId'))
      .subscribe((data: Product[]) => {
        this.products = data;
      });
    this.http.get('http://localhost:3000/company/orders/' + this.cookieService.get('userId'))
      .subscribe((data: OrderDetails[]) => {
        console.log(data);
        this.orders = data;
      });
  }

  handleProductDetailsClicked(product: Product) {
    console.log(product)
  }
}
