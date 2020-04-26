import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/Common/Types/company';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Joi from '@hapi/joi';

interface AddCompany {
  username: string;
  email: string;
  password: string;
  date: Date;
  place: string;
  fullname: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() user: Company;

  addCompany: AddCompany;
  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  message: string;
  tempUser: Company;

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
        if (this.tempUser[field] === undefined || this.tempUser[field] === null || this.tempUser[field] === ''){
          emptyFields++;
        }
      })
      if (emptyFields > 0) {
        this.message = 'Please, fill all fields';
        return false;
      }
    } else {
      const userFields = Object.getOwnPropertyNames(this.addCompany);
      let emptyFields: number = 0;
      userFields.forEach((field) => {
        if (this.addCompany[field] === undefined || this.addCompany[field] === null || this.addCompany[field] === ''){
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
      if (schema.validate(this.addCompany.email).error) {
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
      if (!this.passRegex.test(this.addCompany.password)) {
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
    if (!this.checkIsPasswordFormatOK()) {
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
      this.http.post('http://localhost:3000/users/update', this.tempUser)
        .subscribe((data) => {
          this.back();
        });
    } else {
      this.http.post('http://localhost:3000/users',{
       ...this.addCompany,
       role_id: 2,
      })
        .subscribe((data) => {
          this.back();
        });
    }
  }

  ngOnInit(): void {
    this.tempUser = this.user;
    if (this.user === null) {
      this.addCompany = {
        date: null,
        email: '',
        fullname: '',
        password: '',
        place: '',
        username: '',
      };
    }
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
