import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../Types/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
  currentUser: User;

  emptyOldPassword: boolean;
  emptyNewPassword: boolean;
  emptyConfirmedPassword: boolean;
  wrongOldPassword: boolean;
  newPasswordWrongForamt: boolean;
  newAndConfirmedPasswordsDontMatch: boolean;
  somethingWrong: boolean;
  sameAsOld: boolean;

  initValues() {
    this.emptyOldPassword = false;
    this.emptyNewPassword = false;
    this.emptyConfirmedPassword = false;
    this.wrongOldPassword = false;
    this.newPasswordWrongForamt = false;
    this.newAndConfirmedPasswordsDontMatch = false;
    this.somethingWrong = false;
    this.sameAsOld = false;
  }

  constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) {
    this.initValues();
    const userId = this.cookieService.get('userId');
    this.http.get('http://localhost:3000/users/' + userId).subscribe((data: User) => {
          if (data && data !== null) {
            this.currentUser = data;
          }
      });
  }

  checkInputValues(){
    if (!this.oldPassword || this.oldPassword.length === 0) {
      this.emptyOldPassword = true;
      this.somethingWrong = true;
      return true;
    }
    if (!this.newPassword || this.newPassword.length === 0) {
      this.emptyNewPassword = true;
      this.somethingWrong = true;
      return true;
    }
    if (this.currentUser.password === this.newPassword) {
      this.sameAsOld = true;
      this.somethingWrong = true;
      return true;
    }
    if (!this.confirmedPassword || this.confirmedPassword.length === 0) {
      this.emptyConfirmedPassword = true;
      this.somethingWrong = true;
      return true;
    }
    if (this.oldPassword !== this.currentUser.password){
      this.wrongOldPassword = true;
      this.somethingWrong = true;
      return true;
    }
    if (this.confirmedPassword !== this.newPassword) {
      this.newAndConfirmedPasswordsDontMatch = true;
      this.somethingWrong = true;
      return true;
    }
    if (!this.passRegex.test(this.newPassword)) {
      this.newPasswordWrongForamt = true;
      this.somethingWrong = true;
      return true;
    }
    return false;
  }

  changePass(){
    this.initValues();
    if(!this.checkInputValues()){
      this.http.post('http://localhost:3000/users/update_password', {
       id: this.currentUser.id,
       password: this.newPassword,
      }).subscribe((result: any) => {
        this.cookieService.delete('userRole','/');
        this.cookieService.delete('userId','/');
        this.router.navigate(['/login']);
      });
    }
  }

  ngOnInit(): void {
  }

}
