import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetails } from '../../types/ProductDetails';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetails: ProductDetails;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params['productId']) {
        this.http.get('http://localhost:3000/company/get_product_details/' + params['productId'])
        .subscribe((data: ProductDetails) => {
          this.productDetails = {
            ...data,
            averagerating: +(+data.averagerating).toFixed(2),
          };
        });
      }
    });
    }

}
