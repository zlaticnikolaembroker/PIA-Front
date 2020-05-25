import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDetails } from '../../types/ProductDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { Nullable } from 'src/app/Common/Types/nullable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetails: ProductDetails;
  tempProductDetails: ProductDetails;
  message: string;
  productId: number;
  archived: Nullable<boolean>;

  posibleStatuses = ['Seedling' , 'Preparation'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
    this.message = '';
  }
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params['productId']) {
        this.productId = +params['productId'];
        this.http.get('http://localhost:3000/company/get_product_details/' + params['productId'])
        .subscribe((data: ProductDetails) => {
          this.productDetails = {
            ...data,
            averagerating: +(+data.averagerating).toFixed(2),
          };
          this.tempProductDetails = {
            ...data,
            averagerating: +(+data.averagerating).toFixed(2),
          };
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
    if ((this.productDetails.acceleration_time && this.productDetails.acceleration_time <=0) || (this.productDetails.time_to_grow && this.productDetails.time_to_grow <= 0)) {
      this.message = 'Invalid value for Acceleration Time or Time to Grow';
      return false;
    }
    if (this.productDetails.type == 'Preparation' && (this.productDetails.acceleration_time == null || this.productDetails.time_to_grow != null)) {
      this.message = 'Product with "Preparation" type has only "Acceleration Time" value';
      return false;
    }
    if (this.productDetails.type == 'Seedling' && (this.productDetails.acceleration_time != null || this.productDetails.time_to_grow == null)) {
      this.message = 'Product with "Seedling" type has only "Time to grow" value';
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
      this.http.post('http://localhost:3000/company/update_product',{
        id: this.productId,
        available: this.productDetails.available,
        name: this.productDetails.name,
        price: this.productDetails.price,
        archived: this.productDetails.archived,
        type: this.productDetails.type,
        time_to_grow: this.productDetails.time_to_grow,
        acceleration_time: this.productDetails.acceleration_time,
      })
      .subscribe((data) => {
        this.message = "Product successfully updated.";
      });
    }
  }

  handleBackClicked() {
    this.router.navigate(['company']);
  }

  changeType(e) {
    this.productDetails.type = e.target.value; 
  }

}
