import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  message: string;
  message2: string;
  files: FileList;

  types: string[] = ['Preparation', 'Seedling'];

  constructor(private _formBuilder: FormBuilder, 
      private http: HttpClient, 
      private cookieService: CookieService,
      private router: Router,
      ) {
    this.message = '';
    this.message2 = '';
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.minLength(1)]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [0, Validators.min(0.000000000000000000000000000000000000001)]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [0, Validators.min(0)]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.minLength(1)]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: [0, Validators.min(0)]
    });
  }
  ngOnInit(): void {
    
  }

  checkValues(): boolean {
    this.message = '';
    if (this.firstFormGroup.get('firstCtrl').status === 'INVALID') {
      this.message = 'Invalid name value.';
      return false;
    }

    if (this.secondFormGroup.get('secondCtrl').status === 'INVALID') {
      this.message = 'Invalid price value.';
      return false;
    }

    if (this.thirdFormGroup.get('thirdCtrl').status === 'INVALID') {
      this.message = 'Invalid available value.';
      return false;
    }

    if (this.fourthFormGroup.get('fourthCtrl').status === 'INVALID') {
      this.message = 'Invalid type value.';
      return false;
    }

    if (this.fifthFormGroup.get('fifthCtrl').status === 'INVALID') {
      this.message = this.fourthFormGroup.get('fourthCtrl').value == 'Seedling' ?  'Invalid time to grow value.' : 'Invalid acceleration time value.';
      return false;
    }

    return true;
  }

  handleFinishClicked() {
    if (this.checkValues()) {
      this.http.post('http://localhost:3000/company/product',{
        name: this.firstFormGroup.get('firstCtrl').value,
        price: this.secondFormGroup.get('secondCtrl').value,
        available: this.thirdFormGroup.get('thirdCtrl').value,
        company_id: +this.cookieService.get('userId'),
        type: this.fourthFormGroup.get('fourthCtrl').value.length > 0 ? this.fourthFormGroup.get('fourthCtrl').value : this.types[0],
        time_to_grow: this.fourthFormGroup.get('fourthCtrl').value == 'Seedling' ? this.fifthFormGroup.get('fifthCtrl').value : null,
        acceleration_time: this.fourthFormGroup.get('fourthCtrl').value == 'Seedling' ? null : this.fifthFormGroup.get('fifthCtrl').value,
      })
        .subscribe((data) => {
          this.message = 'Product successfully inserted';
          setTimeout(() => {
            this.router.navigate(['company']);
          }, 2500);
        });
    }
  }

  handleFileSelect(files) {
    this.message2 = '';
    const reader = new FileReader();
    const self = this;
    reader.onload = async function(e) { 
    try {
      const json = JSON.parse(e.target.result as string);
      const productsToInsert= [];
      if (json.length) {
        json.forEach(element => {
          productsToInsert.push({
            name: element.name,
            available: element.available,
            price: element.price,
            type: element.type,
            time_to_grow: element.type === 'Seedling' ? element.time_to_grow : null,
            acceleration_time: element.type === 'Seedling' ? null : element.acceleration_time,
          });
        });
      } else {
        productsToInsert.push({
          name: json.name,
          available: json.available,
          price: json.price,
          type: json.type,
          time_to_grow: json.type === 'Seedling' ? json.time_to_grow: null,
          acceleration_time: json.type === 'Seedling' ? null : json.acceleration_time,
        });
      }
      let somethingWrong = false;
      productsToInsert.forEach((product, index) => {
        if (typeof product.name !== 'string') {
          self.message2 += ('Wrong type of field "name" in product number:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
        if (isNaN(+product.price)) {
          self.message2 += ('Wrong type of field "price" in product number:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
        if (isNaN(+product.available)) {
          self.message2 += ('Wrong type of field "available" in product number:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
        if (+product.price <= 0) {
          self.message2 += ('Field "price" less or equal to 0 in product number:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        } 
        if (+product.available < 0) {
          self.message2 += ('Field "available" less than 0 in product number:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
        if (product.type != 'Seedling' && product.type != 'Preparation') {
          self.message2 += ('Field "type" has to be Seedling or Preparation:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
        if (product.type == 'Seedling' && isNaN(product.time_to_grow)) {
          self.message2 += ('Product with type Seedling has to have "time to grow" value:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
        if (product.type != 'Seedling' && isNaN(product.acceleration_time)) {
          self.message2 += ('Product with type Preparation has to have "acceleration value" value:' + (index + 1) + '\n');
          somethingWrong = true;
          return;
        }
      });
      if (somethingWrong) {
        return;
      } else {   
        console.log(productsToInsert);
        function insertProduct(productIndex) {
          self.http.post('http://localhost:3000/company/product',{
            ...productsToInsert[productIndex],
            company_id: +self.cookieService.get('userId'),
          })
          .toPromise()
          .then(() => {
            if(productIndex < productsToInsert.length -1) {
              productIndex++;
              insertProduct(productIndex);
            }
          })
          .catch((error) => {
           self.message2 = error.message;
          });
        }     
        somethingWrong = false;
        insertProduct(0);
        if (self.message2 === '') {
          self.message2 = 'Products successfully inserted';
          setTimeout(() => {
            self.router.navigate(['company']);
          }, 2500);
        }
        
      }
      } catch (error) {
        self.message2 = error;
      }
    }

    for (let i = 0, f; f = files[i]; i++) {
      reader.readAsText(f);
    }
  
  }

  back() {
    this.router.navigate(['company']);
  }
  

  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.readAsText(this.files[0]);
}

}
