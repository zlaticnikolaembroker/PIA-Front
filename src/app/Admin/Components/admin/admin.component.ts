import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/Common/Types/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() user: Admin;
  @Input() update: Function;

  userEdited: boolean;
  passwordNotStrong: boolean;

  passRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  initFlags(){
    this.userEdited = false;
    this.passwordNotStrong = false;
  }

  constructor(private router: Router) { 
  }

  tempUser: Admin;

  ngOnInit(): void {
    this.tempUser = this.user;
  }

  checkIsUserEdited() {
    if (this.user.email === this.tempUser.email && this.user.password === this.tempUser.password && this.user.username === this.tempUser.username) {
      this.userEdited = true;
      return false;
    }
    return true;
  }

  checkIsEmailFormatOK(){
    if (!this.passRegex.test(this.tempUser.password)) {
      this.passwordNotStrong = true;
      return false;
    }
    return true;
  }

  checkData(){
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
    this.update(this.user);
    this.update(this.tempUser);
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
