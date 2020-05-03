import { Component, OnInit, Input } from '@angular/core';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Joi from '@hapi/joi';
import { Nullable } from 'src/app/Common/Types/nullable';

interface AddFarmer {
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  date: Date;
  place: string;
  phone: string;
  confirmed: Nullable<boolean>;
}
@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  @Input() user: Nullable<Farmer>;

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  tempUser: Nullable<Farmer>;
  message: string;

  addFarmer: AddFarmer;

  constructor(private router: Router, private http: HttpClient) { }


  checkIsUserEdited() {
    if (this.user === null) {
      return true;
    }
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
    if (this.user !== null) {
      const userFields = Object.getOwnPropertyNames(this.tempUser);
      let emptyFields: number = 0;
      userFields.forEach((field) => {
        if ((this.tempUser[field] === undefined || this.tempUser[field] === null || this.tempUser[field] === '') && field !== 'confirmed'){
          emptyFields++;
        }
      })
      if (emptyFields > 0) {
        this.message = 'Please, fill all fields';
        return false;
      }
    } else {
      const userFields = Object.getOwnPropertyNames(this.addFarmer);
      let emptyFields: number = 0;
      userFields.forEach((field) => {
        if ((this.addFarmer[field] === undefined || this.addFarmer[field] === null || this.addFarmer[field] === '') && field !== 'confirmed'){
          emptyFields++;
        }
      })
      if (emptyFields > 0) {
        this.message = 'Please, fill all fields';
        return false;
      }
    }
    return true;
  }

  checkEmailFormat() {
    const schema = Joi.string().email({
      tlds: false,
      allowUnicode: false,
    });
    if (this.user !== null) {
      if (schema.validate(this.tempUser.email).error) {
        this.message = 'Email format wrong';
        return false;
      }
    } else {
      if (schema.validate(this.addFarmer.email).error) {
        this.message = 'Email format wrong';
        return false;
      }
    }
    return true;
  }
  
  checkIsPasswordFormatOK(){
    if (this.user !== null) {
      if (!this.passRegex.test(this.tempUser.password)) {
        this.message = "Password not strong";
        return false;
      }
    } else {
      if (!this.passRegex.test(this.addFarmer.password)) {
        this.message = "Password not strong";
        return false;
      }
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
    if (this.user !== null) {
      this.http.post('http://localhost:3000/users/update', this.tempUser)
        .subscribe((data) => {
          this.back();
        });
    } else {
      this.http.post('http://localhost:3000/users',{
       ...this.addFarmer,
       role_id: 3,
      })
        .subscribe((data) => {
          this.back();
        });
    }
  }

  ngOnInit(): void {
    this.tempUser = this.user;
    if (this.user === null) {
      this.addFarmer = {
        date: null,
        email: '',
        lastname: '',
        name: '',
        password: '',
        phone: '',
        place: '',
        username: '',
        confirmed: null,
      }
    }
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
