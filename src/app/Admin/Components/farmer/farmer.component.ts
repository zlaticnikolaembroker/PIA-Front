import { Component, OnInit, Input } from '@angular/core';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Joi from '@hapi/joi';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  @Input() user: Farmer;
  @Input() update: Function;

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  tempUser: Farmer;
  message: string;
  constructor(private router: Router, private http: HttpClient) { }


  checkIsUserEdited() {
    const userFields = Object.getOwnPropertyNames(this.tempUser);
    let fieldsChanged: number = 0;
    userFields.forEach((field) => {
      if (this.user[field] !== this.tempUser[field]){
        fieldsChanged++;
      }
    })
    if (fieldsChanged === 0) {
      this.message = 'Nothing changed';
      return false;
    }
    return true;
  }

  checkForEmptyFields() {
    const userFields = Object.getOwnPropertyNames(this.tempUser);
    let emptyFields: number = 0;
    userFields.forEach((field) => {
      if (this.tempUser[field] === undefined || this.tempUser[field] === null || this.tempUser[field] === ''){
        emptyFields++;
      }
    })
    if (emptyFields > 0) {
      this.message = 'Please, fill all fields';
      return false;
    }
    return true;
  }

  checkEmailFormat() {
    const schema = Joi.string().email({
      tlds: false,
      allowUnicode: false,
    });
    if (schema.validate(this.tempUser.email).error) {
      this.message = 'Email format wrong';
      return false;
    }
    return true;
  }
  
  checkIsPasswordFormatOK(){
    if (!this.passRegex.test(this.tempUser.password)) {
      this.message = "Password not strong";
      return false;
    }
    return true;
  }

  checkData(){
    this.message = "";
    if (!this.checkIsUserEdited()) {
      return false;
    }
    if (!this.checkIsPasswordFormatOK()) {
      return false;
    }
    if (!this.checkEmailFormat()) {
      return false;
    }
    if (!this.checkForEmptyFields()) {
      return false;
    }
    return true;
  }

  handleUpdate() {
    if (!this.checkData()){
      return;
    }
    console.log("should be here");

    this.http.post('http://localhost:3000/users/update', this.tempUser)
      .subscribe((data) => {
        this.back();
      });
  }

  ngOnInit(): void {
    this.tempUser = this.user;
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
