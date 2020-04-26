import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/Common/Types/admin';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Nullable } from 'src/app/Common/Types/nullable';
import Joi from '@hapi/joi';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() user: Nullable<Admin>;

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  constructor(private router: Router, private http: HttpClient) { 
  }

  tempUser: Nullable<Admin>;
  message: string;

  username: string;
  password: string;
  email:string;

  ngOnInit(): void {
    this.tempUser = this.user;
  }

  checkIsUserEdited() {
    if(this.user === null) {
      return true;
    }
    if (this.user.email === this.tempUser.email && this.user.password === this.tempUser.password && this.user.username === this.tempUser.username) {
      this.message = "User not edited";
      return false;
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
      if (schema.validate(this.email).error) {
        this.message = 'Email format wrong';
        return false;
      }
    }
    return true;
  }

  checkForEmptyFields() {
    if (this.user !== null) {
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
    } else {
      if (this.email === null || this.email === undefined || this.email === ''){
        this.message = 'Please, fill all fields';
        return false;
      }
    }
    return true;
  }

  checkIsPasswordStrong(){
    if (this.user !== null) {
      if (!this.passRegex.test(this.tempUser.password)) {
        this.message = "Password not strong";
        return false;
      }
    } else {
      if (!this.passRegex.test(this.password)) {
        this.message = "Password not strong";
        return false;
      }
    }
    return true;
  }

  checkData(){
    this.message = "";
    if (!this.checkForEmptyFields()) {
      return false;
    }
    if (!this.checkIsUserEdited()) {
      return false;
    }
    if (!this.checkIsPasswordStrong()) {
      return false;
    }
    if (!this.checkEmailFormat()) {
      return false;
    }
    return true;
  }

  handleUpdate() {
    if (!this.checkData()){
      return;
    }
    if (this.user !== null) {
      this.http.post('http://localhost:3000/users/update',this.tempUser)
        .subscribe((data) => {
          this.back();
        });
    } else {
      this.http.post('http://localhost:3000/users',{
        username: this.username,
        password: this.password,
        email: this.email,
        role_id: 1,
      })
        .subscribe((data) => {
          this.back();
        });
    }
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
