import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Common/Types/user';
import { HttpClient } from '@angular/common/http';
import { Admin } from 'src/app/Common/Types/admin';
import { Company } from 'src/app/Common/Types/company';
import { Farmer } from 'src/app/Common/Types/farmer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor( private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe( params => {
      this.http.get('http://localhost:3000/users/' + params['id']).subscribe((data: User) => {
          if (data && data !== null) {
            this.user = data;
          }
      });
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

  updateAdmin(admin: Admin) {
    console.log(admin);
  }

  updateFarmer(farmer: Farmer) {
    console.log(farmer);
  }

  updateCompany(company: Company) {
    console.log(company);
  }

  ngOnInit(): void {
  }

}
