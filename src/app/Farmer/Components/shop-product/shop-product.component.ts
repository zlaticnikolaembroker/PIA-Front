import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit {

  product;
  amountOfOrder;
  message = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.amountOfOrder = 0;
    this.route.params.subscribe( params => {
      if(params['productId']) {
        this.http.get('http://localhost:3000/farmer/online_shop/' + params['productId']).subscribe((data) => {
          this.product = data;
        });
      }
    });
  }

  handleBackClicked() {
    this.router.navigate(['/farmer/online_shop/'])
  }

  checkOrder():boolean {
    if (this.amountOfOrder <= 0) {
      this.message = "Please enter number greater than zero.";
      return false;
    }
    if (this.amountOfOrder > this.product.available) {
      this.message = "Not enough available products.";
      return false;
    }
    return true;
  }

  handleOrderClicked() {
    this.message = null;
    if (this.checkOrder()){

    }
  }

}
