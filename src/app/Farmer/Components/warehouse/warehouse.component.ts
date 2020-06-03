import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  onlineShopClicked() {
    this.router.navigate(['/farmer/online_shop'])
  }

  currentOrdersClicked(){
    this.router.navigate(['/farmer/orders'])
  }

}
