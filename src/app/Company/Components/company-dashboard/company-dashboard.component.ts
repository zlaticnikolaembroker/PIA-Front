import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/Common/Types/product';
import { OrderDetails } from '../../types/OrderDetails';

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
    this.getProducts();
    this.getOrders();
  }

  handleProductDetailsClicked(product: Product) {
    console.log(product)
  }

  handleOrderDetailsClicked(order: OrderDetails) {
    console.log(order);
  }

  getProducts() {
    this.http.get('http://localhost:3000/company/products/' + this.cookieService.get('userId'))
    .subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  getOrders() {
    this.http.get('http://localhost:3000/company/orders/' + this.cookieService.get('userId'))
    .subscribe((data: OrderDetails[]) => {
      this.orders = data;
    });
  }

  orderChangeStatus(orderId: number, acceptOrder: boolean) {
    this.http.post('http://localhost:3000/company/order_set_status', {
      id: orderId,
      acceptOrder,
    })
    .subscribe(() => {
      this.orders = this.orders.map((order) => {
        if(order.id !== orderId) {
          return order;
        } 
        return {
          ...order,
          status: acceptOrder === true ? 'On wait' : 'Rejected',
        };
      });
    });
  }
}
