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
  message: string;

  constructor(private _formBuilder: FormBuilder, 
      private http: HttpClient, 
      private cookieService: CookieService,
      private router: Router,
      ) {
    this.message = '';
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.minLength(1)]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [0, Validators.min(0)]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [0, Validators.min(0)]
    });
    console.log(this.cookieService.get('userId'));
    console.log(this.cookieService.getAll());
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

    return true;
  }

  handleFinishClicked() {
    if (this.checkValues()) {
      this.http.post('http://localhost:3000/company/product',{
        name: this.firstFormGroup.get('firstCtrl').value,
        price: this.secondFormGroup.get('secondCtrl').value,
        available: this.thirdFormGroup.get('thirdCtrl').value,
        company_id: +this.cookieService.get('userId'),
      })
        .subscribe((data) => {
          this.router.navigate(['company']);
        });
    }
  }

}
