import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/Common/Types/admin';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() user: Admin;

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  constructor(private router: Router, private http: HttpClient) { 
  }

  tempUser: Admin;
  message: string;

  ngOnInit(): void {
    this.tempUser = this.user;
  }

  checkIsUserEdited() {
    if (this.user.email === this.tempUser.email && this.user.password === this.tempUser.password && this.user.username === this.tempUser.username) {
      this.message = "User not edited";
      return false;
    }
    return true;
  }

  checkIsEmailFormatOK(){
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
    if (!this.checkIsEmailFormatOK()) {
      return false;
    }
    return true;
  }

  handleUpdate() {
    if (!this.checkData()){
      return;
    }
    this.http.post('http://localhost:3000/users/update_admin', {
      id: this.tempUser.id,
      email: this.tempUser.email,
      username: this.tempUser.username,
      password: this.tempUser.password,
    }).subscribe((data) => {
        this.back();
      });
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
