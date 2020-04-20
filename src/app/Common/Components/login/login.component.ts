import { Component, OnInit } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../Types/user';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private cookieService : CookieService, private route : Router) { 
    this.showPassword = false;
  }

  ngOnInit(): void {
    
  }

  handleShowPassword = () => {
    this.showPassword = !this.showPassword;
  }

  onSubmit = () => {
      this.http.post('http://localhost:3000/users/get_user_by_username', {
          username: this.username,
      }).subscribe((data: User) => {
         if (data === null) {
            this.message = "User with provided username and password does not exist";
            return;
         }
         if (data.password !== this.password) {
            this.message = "User with provided username and password does not exist";
            return;
         }
         this.cookieService.set('userRole' , data.role_id.toString());
         this.cookieService.set('userId' , data.id.toString());
         switch(data.role_id) {
            case 1: {
              this.route.navigate(['/admin']);
              break;
            }
            case 2: {
              this.route.navigate(['/company']);
              break;
            }
            case 3: {
              this.route.navigate(['/farmer']);
              break;
            }
         }
      });
  }


}
