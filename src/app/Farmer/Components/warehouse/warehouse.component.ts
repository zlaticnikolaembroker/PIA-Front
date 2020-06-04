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

  products: [];

  constructor(private cookieService: CookieService, private router: Router, private http: HttpClient) {
    this.http.get('http://localhost:3000/farmer/products/' + +this.cookieService.get('garden_id')).subscribe((data: []) => {
        this.products = data;
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

}
