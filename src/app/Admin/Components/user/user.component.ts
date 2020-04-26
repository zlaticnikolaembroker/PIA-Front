import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Common/Types/user';
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/Common/Types/admin';
import { Company } from 'src/app/Common/Types/company';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Nullable } from 'src/app/Common/Types/nullable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: Nullable<User> = null;
  role_id: Nullable<number> = null;
  constructor( private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe( params => {
      if(params['id']) {
        this.http.get('http://localhost:3000/users/' + params['id']).subscribe((data: User) => {
          if (data && data !== null) {
            this.user = data;
          }
        });
      } else {
        this.role_id = +params['role_id'];
      }
    });
  }

  toAdmin(): Admin {
    return User.toAdmin(this.user);
  }

  toCompany(): Company {
    return User.toCompany(this.user);
  }

  toFarmer(): Farmer {
    return User.toFarmer(this.user);
  }

  ngOnInit(): void {
  }

}
