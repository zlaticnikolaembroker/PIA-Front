import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {
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

    }
  }

}
