import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit {

  product;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if(params['productId']) {
        this.http.get('http://localhost:3000/farmer/online_shop/' + params['productId']).subscribe((data) => {
          this.product = data;
          console.log(this.product);
        });
      }
    });
  }

}
