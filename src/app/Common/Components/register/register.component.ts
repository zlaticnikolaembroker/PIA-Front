import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data;

  differentConfirmedPassword:boolean = false;
  notUniqueUsername:boolean = false;
  mailUsedThirdTime:boolean = false;
  wrongJMBGFormat:boolean = false;
  dateOfBirthInTheFuture:boolean = false;
  showPassword:boolean = false;
  showConfirmedPassword:boolean = false;
  passwordNotStrong:boolean = false;
  confirmedPasswordNotStrong:boolean = false;
  jmbgFormatWrong:boolean = false;

  firstNameEmpty:boolean = false;
  lastNameEmpty:boolean = false;
  usernameEmpty:boolean = false;
  passwordEmpty:boolean = false;
  confirmedPasswordEmpty:boolean = false;
  dateOfBirthEmpty:boolean = false;
  placeOfBirthEmpty:boolean = false;
  jmbgEmpty:boolean = false;
  phoneEmpty:boolean = false;
  mailEmpty:boolean = false;

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  jmbgRegex = new RegExp("^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])[0-9]{9}$");

  refreshEmptyFlags(){
    this.firstNameEmpty = false;
    this.lastNameEmpty = false;
    this.usernameEmpty = false;
    this.passwordEmpty = false;
    this.confirmedPasswordEmpty = false;
    this.dateOfBirthEmpty = false;
    this.placeOfBirthEmpty = false;
    this.jmbgEmpty = false;
    this.phoneEmpty = false;
    this.mailEmpty = false;
    this.differentConfirmedPassword = false;
    this.notUniqueUsername = false;
    this.mailUsedThirdTime = false;
    this.wrongJMBGFormat = false;
    this.dateOfBirthInTheFuture = false;
    this.passwordNotStrong = false;
    this.confirmedPasswordNotStrong = false;
    this.jmbgFormatWrong = false;
  }

  constructor() { 
    this.data = {
      first_name :"",
      last_name : "",
      username : "",
      password : "",
      confirmed_password : "",
      date_of_birth: null,
      place_of_birth: "",
      jmbg: "",
      phone: "",
      mail: "",
    }
  }

  ngOnInit() {
  }

  public handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  public handleShowConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  checkForEmptyFields(){
    let somethingEmpty = false;
    if(this.data.first_name == ""){
      this.firstNameEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.last_name == ""){
      this.lastNameEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.username == ""){
      this.usernameEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.password == ""){
      this.passwordEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.confirmed_password == ""){
      this.confirmedPasswordEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.date_of_birth == null){
      this.dateOfBirthEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.place_of_birth == ""){
      this.placeOfBirthEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.jmbg == ""){
      this.jmbgEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.phone == ""){
      this.phoneEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.mail == ""){
      this.mailEmpty = true;
      somethingEmpty = true;
    }
    return somethingEmpty;
  }

  checkPasswordsAndJMBGFormats(){

    if(!this.passRegex.test(this.data.password)) {
      this.passwordNotStrong = true;
      return true;
    }

    if(!this.passRegex.test(this.data.confirmed_password)) {
      this.confirmedPasswordNotStrong = true;
      return true;
    }

    if(!this.jmbgRegex.test(this.data.jmbg)){
      this.jmbgFormatWrong = true;
      return true;
    }
  }

  checkPassAndConfirmedPassMatch(){
    if(this.data.password !== this.data.confirmed_password){
      this.differentConfirmedPassword = true;
      return true;
    }
    return false;
  }

  check18YearsOld(){
    let year18 = new Date();
    year18.setFullYear(2002);
    if(new Date(this.data.date_of_birth) > year18){
      this.dateOfBirthInTheFuture = true;
      return true;
    }
    return false;
  }

  public onSubmit(){
    
    this.refreshEmptyFlags();

    if(this.checkForEmptyFields()){
      return;
    } 

    if(this.checkPasswordsAndJMBGFormats()){
      return;
    }

    if(this.checkPassAndConfirmedPassMatch()){
      return;
    }
    
    if(this.check18YearsOld()){
      return;
    }
    
  }
  
}