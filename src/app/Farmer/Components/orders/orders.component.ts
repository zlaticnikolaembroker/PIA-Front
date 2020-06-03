import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: [];

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.http.get('http://localhost:3000/farmer/orders/' + +this.cookieService.get("userId")).subscribe((data) => {
        console.log(data);
    });
   }

  ngOnInit(): void {
  }

}
