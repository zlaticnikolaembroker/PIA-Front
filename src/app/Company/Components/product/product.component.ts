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
  tempProductDetails: ProductDetails;
  message: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.message = '';
  }
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params['productId']) {
        this.http.get('http://localhost:3000/company/get_product_details/' + params['productId'])
        .subscribe((data: ProductDetails) => {
          this.productDetails = {
            ...data,
            averagerating: +(+data.averagerating).toFixed(2),
          };
          this.tempProductDetails = {
            ...data,
            averagerating: +(+data.averagerating).toFixed(2),
          }
        });
      }
    });
  }

  checkDataCorrectness(): boolean {
    if (this.productDetails.available < 0) {
      this.message = 'Value for available can\'t be less than zero.'
      return false;
    } 
    if (+this.productDetails.price === NaN) {
      this.message = 'Value for price have to be a valid number.'
      return false;
    }
    return true;
  }

  checkDateEdit(): boolean {
    const userFields = Object.getOwnPropertyNames(this.productDetails);
    let fieldsChanged: number = 0;
    userFields.forEach((field) => {
      if (this.tempProductDetails[field] !== this.productDetails[field]){
        fieldsChanged++;
      }
    })
    if (fieldsChanged === 0) {
      this.message = 'Nothing changed';
      return false;
    }
    return true;
  }

  checkValues(): boolean {
    if (this.productDetails.available === null || this.productDetails.available === undefined ||
      this.productDetails.price === null || this.productDetails.price === undefined ||
      this.productDetails.name === null || this.productDetails.name === undefined || this.productDetails.name === ''
      ) {
      this.message = 'Please fill out all fields.';
      return false;
    }
    return true;
  }

  handleUpdate() {
    this.message = '';
    if(this.checkValues() && this.checkDataCorrectness() && this.checkDateEdit()) {

    }
  }

}
