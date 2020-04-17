import { Component, OnInit } from '@angular/core';
import { UserType } from '../../Types/userType';
import { Nullable } from '../../Types/nullable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data: { 
    first_name: string; 
    last_name: string; 
    username: string; 
    password: string; 
    confirmed_password: string; 
    date_of_birth: Date; 
    place_of_birth: string; 
    jmbg: string; 
    phone: string; 
    mail: string; 
    userType: Nullable<UserType>;
  };
  flags: {
    differentConfirmedPassword:boolean;
    notUniqueUsername:boolean;
    mailUsedThirdTime:boolean;
    wrongJMBGFormat:boolean;
    dateOfBirthInTheFuture:boolean;
    showPassword:boolean;
    showConfirmedPassword:boolean;
    passwordNotStrong:boolean;
    confirmedPasswordNotStrong:boolean;
    jmbgFormatWrong:boolean;
    firstNameEmpty:boolean;
    lastNameEmpty:boolean;
    usernameEmpty:boolean;
    passwordEmpty:boolean;
    confirmedPasswordEmpty:boolean;
    dateOfBirthEmpty:boolean;
    placeOfBirthEmpty:boolean;
    jmbgEmpty:boolean;
    phoneEmpty:boolean;
    mailEmpty:boolean;
  }

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  jmbgRegex = new RegExp("^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[012])[0-9]{9}$");

  refreshEmptyFlags(){
    this.flags = {
      firstNameEmpty: false,
      lastNameEmpty: false,
      usernameEmpty: false,
      passwordEmpty: false,
      confirmedPasswordEmpty: false,
      dateOfBirthEmpty: false,
      placeOfBirthEmpty: false,
      jmbgEmpty: false,
      phoneEmpty: false,
      mailEmpty: false,
      differentConfirmedPassword: false,
      notUniqueUsername: false,
      mailUsedThirdTime: false,
      wrongJMBGFormat: false,
      dateOfBirthInTheFuture: false,
      passwordNotStrong: false,
      confirmedPasswordNotStrong: false,
      jmbgFormatWrong: false,
      showConfirmedPassword: false,
      showPassword: false,
    }
  }

  initDataValues(){
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
      userType: null,
    }
  }

  constructor() {
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

  checkForEmptyFields(){
    let somethingEmpty = false;
    if(this.data.first_name == ""){
      this.flags.firstNameEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.last_name == ""){
      this.flags.lastNameEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.username == ""){
      this.flags.usernameEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.password == ""){
      this.flags.passwordEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.confirmed_password == ""){
      this.flags.confirmedPasswordEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.date_of_birth == null){
      this.flags.dateOfBirthEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.place_of_birth == ""){
      this.flags.placeOfBirthEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.jmbg == ""){
      this.flags.jmbgEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.phone == ""){
      this.flags.phoneEmpty = true;
      somethingEmpty = true;
    }
    if(this.data.mail == ""){
      this.flags.mailEmpty = true;
      somethingEmpty = true;
    }
    return somethingEmpty;
  }

  checkPasswordsAndJMBGFormats(){

    if(!this.passRegex.test(this.data.password)) {
      this.flags.passwordNotStrong = true;
      return true;
    }

    if(!this.passRegex.test(this.data.confirmed_password)) {
      this.flags.confirmedPasswordNotStrong = true;
      return true;
    }

    if(!this.jmbgRegex.test(this.data.jmbg)){
      this.flags.jmbgFormatWrong = true;
      return true;
    }
  }

  checkPassAndConfirmedPassMatch(){
    if(this.data.password !== this.data.confirmed_password){
      this.flags.differentConfirmedPassword = true;
      return true;
    }
    return false;
  }

  check18YearsOld(){
    let year18 = new Date();
    year18.setFullYear(2002);
    if(new Date(this.data.date_of_birth) > year18){
      this.flags.dateOfBirthInTheFuture = true;
      return true;
    }
    return false;
  }

  changeUserType(e) {

    console.log(e.target.value);

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