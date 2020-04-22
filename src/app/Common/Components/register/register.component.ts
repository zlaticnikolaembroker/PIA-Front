import { Component, OnInit } from '@angular/core';
import { UserType, UserTypeCompany, UserTypeFarmer, UserTypeListList } from '../../Types/userType';
import Joi from '@hapi/joi';
import { User } from '../../Types/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  confirmedPassword: string;
  userType: UserType;
  message: string;
  flags: {
    differentConfirmedPassword: boolean;
    notUniqueUsername: boolean;
    mailUsedThirdTime: boolean;
    showPassword: boolean;
    showConfirmedPassword: boolean;
    passwordNotStrong: boolean;
    confirmedPasswordNotStrong: boolean;
    firstNameEmpty: boolean;
    lastNameEmpty: boolean;
    usernameEmpty: boolean;
    passwordEmpty: boolean;
    confirmedPasswordEmpty: boolean;
    dateOfBirthEmpty: boolean;
    placeOfBirthEmpty: boolean;
    phoneEmpty: boolean;
    mailEmpty: boolean;
    mailFormatWrong: boolean;
    fullNameEmprty: boolean;
    somethingWentWring: boolean;
    recaptchaClicked: boolean;
  }

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  refreshEmptyFlags() {
    this.flags = {
      firstNameEmpty: false,
      lastNameEmpty: false,
      usernameEmpty: false,
      passwordEmpty: false,
      confirmedPasswordEmpty: false,
      dateOfBirthEmpty: false,
      placeOfBirthEmpty: false,
      phoneEmpty: false,
      mailEmpty: false,
      differentConfirmedPassword: false,
      notUniqueUsername: false,
      mailUsedThirdTime: false,
      passwordNotStrong: false,
      confirmedPasswordNotStrong: false,
      showConfirmedPassword: false,
      showPassword: false,
      mailFormatWrong: false,
      fullNameEmprty: false,
      somethingWentWring: false,
      recaptchaClicked: false,
    }
  }

  initDataValues() {
    this.user = {
      email: "",
      fullName: null,
      id: null,
      lastname: null,
      name: null,
      password: "",
      phone: null,
      role_id: null,
      username: "",
      date: null,
      place: "",
    }
    this.confirmedPassword = "";
    this.userType = "";
    this.message = "";
  }

  constructor(private http: HttpClient, private route : Router) {
    this.initDataValues();
    this.refreshEmptyFlags();
  }

  ngOnInit() {
  }

  public handleShowPassword() {
    this.flags.showPassword = !this.flags.showPassword;
  }

  public handleShowConfirmedPassword() {
    this.flags.showConfirmedPassword = !this.flags.showConfirmedPassword;
  }

  checkForEmptyFields() {
    let somethingEmpty = false;
    if (this.user.username == "") {
      this.flags.usernameEmpty = true;
      somethingEmpty = true;
    }
    if (this.user.password == "") {
      this.flags.passwordEmpty = true;
      somethingEmpty = true;
    }
    if (this.confirmedPassword == "") {
      this.flags.confirmedPasswordEmpty = true;
      somethingEmpty = true;
    }
    if (this.user.date == null) {
      this.flags.dateOfBirthEmpty = true;
      somethingEmpty = true;
    }
    if (this.user.place == "") {
      this.flags.placeOfBirthEmpty = true;
      somethingEmpty = true;
    }
    if (this.user.email == "") {
      this.flags.mailEmpty = true;
      somethingEmpty = true;
    }
    if (this.userType === UserTypeCompany) {
      if (this.user.fullName == "") {
        this.flags.fullNameEmprty = true;
        somethingEmpty = true;
      }
    }
    if (this.userType === UserTypeFarmer) {
      if (this.user.phone == "") {
        this.flags.phoneEmpty = true;
        somethingEmpty = true;
      }
      if (this.user.name == "") {
        this.flags.firstNameEmpty = true;
        somethingEmpty = true;
      }
      if (this.user.lastname == "") {
        this.flags.lastNameEmpty = true;
        somethingEmpty = true;
      }
    }
    return somethingEmpty;
  }

  checkPasswordsAndMailFormats() {
    let schema = Joi.string().email({
      tlds: false,
      allowUnicode: false,
    });
    if (schema.validate(this.user.email).error) {
      this.flags.mailFormatWrong = true;
      return true;
    }
    if (!this.passRegex.test(this.user.password)) {
      this.flags.passwordNotStrong = true;
      return true;
    }

    if (!this.passRegex.test(this.confirmedPassword)) {
      this.flags.confirmedPasswordNotStrong = true;
      return true;
    }
  }

  checkPassAndConfirmedPassMatch(){
    if (this.user.password !== this.confirmedPassword) {
      this.flags.differentConfirmedPassword = true;
      return true;
    }
    return false;
  }

  changeUserType(e) {
    this.initDataValues();
    this.refreshEmptyFlags();
    this.userType = e.currentTarget.id as UserType;
  }

  public onSubmit() {

    this.checkPasswordsAndMailFormats();
    
    this.refreshEmptyFlags();

    if (this.checkForEmptyFields()) {
      return;
    } 

    if (this.checkPasswordsAndMailFormats()) {
      return;
    }

    if (this.checkPassAndConfirmedPassMatch()) {
      return;
    }

    this.http.post('http://localhost:3000/users', {
        username: this.user.username, 
        password: this.user.password, 
        email: this.user.email, 
        date: this.user.date, 
        place: this.user.place, 
        role_id: UserTypeListList.indexOf(this.userType) + 1, 
        fullName: this.user.fullName, 
        name: this.user.name, 
        lastname: this.user.lastname, 
        phone: this.user.phone,
      }).subscribe((result: any) => {
        if (result !== null && result.error) {
          this.flags.somethingWentWring = true;
          this.message = result.error;
        } else {
          this.route.navigate(['login']);
        }
      });
  }

  public recaptchaClicked(){
    this.flags.recaptchaClicked = true;
  }
  
}