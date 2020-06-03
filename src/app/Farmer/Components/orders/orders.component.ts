import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: [];

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:3000/farmer/orders/' + +this.cookieService.get("garden_id")).subscribe((data: []) => {
      this.orders = data;
      console.log(this.cookieService.getAll());
      console.log(data);
    });
   }

  ngOnInit(): void {
  }

  detailsClicked(id) {
    this.router.navigate(['/farmer/orders/' + id])
  }

  rejectClicked(id) {
    this.http.post('http://localhost:3000/company/order_set_status', {
      id: id,
      acceptOrder: false,
    })
    .subscribe(() => {
      //@ts-ignore
      this.orders = this.orders.map((order) => {
        // @ts-ignore
        if (order.id != id){
          return order;
        }
        return {
          // @ts-ignore
          ...order,
          status: 'Rejected',
        }
      })
    });
  }

}
