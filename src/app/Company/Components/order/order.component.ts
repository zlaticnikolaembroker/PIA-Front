import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderDetails;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      if (params['orderId']) {
        this.http.get('http://localhost:3000/company/get_order_details/' + +params['orderId']).subscribe((data) => {
         this.orderDetails = data;
         console.log(data);
      });
      }
    });
   }

  ngOnInit(): void {
  }

}
