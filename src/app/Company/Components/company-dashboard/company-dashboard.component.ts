import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/app/Common/Types/product';
import { OrderDetails } from '../../types/OrderDetails';
import { Nullable } from 'src/app/Common/Types/nullable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  products: Product[];
  orders: OrderDetails[];

  sortOrdersByDateAsc: Nullable<boolean>;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    this.sortOrdersByDateAsc = null;
  }
  
  ngOnInit(): void {
    this.getProducts();
    this.getOrders();
  }

  handleProductDetailsClicked(product: Product) {
    this.router.navigate(['/company/products/' + product.id])
  }

  handleOrderDetailsClicked(order: OrderDetails) {
    this.router.navigate(['company/orders/' + order.id]);
  }

  getProducts() {
    this.http.get('http://localhost:3000/company/products/' + this.cookieService.get('userId'))
    .subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  sortOrders() {
    if (this.sortOrdersByDateAsc === null) {
      this.sortOrdersByDateAsc = true;
    } else {
      this.sortOrdersByDateAsc = !this.sortOrdersByDateAsc;
    }
    this.orders = this.orders.sort((a,b) => {
      if (a.date_of_order === b.date_of_order){
        return 0;
      }
      if (a.date_of_order > b.date_of_order) {
        if (this.sortOrdersByDateAsc === true) {
          return 1;
        }
        return -1;
      }
      if (this.sortOrdersByDateAsc === true) {
        return -1;
      }
      return 1;
    })
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
  handleAddProductClicked() {
    this.router.navigate(['/company/add-product'])
  }

  handleCheckReportClicked() {
    this.router.navigate(['/company/report'])
  }
}
