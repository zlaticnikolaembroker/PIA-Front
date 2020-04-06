import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  showPassword: boolean;
  message: string;

  constructor() { 
    this.showPassword = false;
  }

  ngOnInit(): void {
    
  }

  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  }

  onSubmit = () => {
    console.log(this.username);
    console.log(this.password);
    this.message = this.password;
  }


}
