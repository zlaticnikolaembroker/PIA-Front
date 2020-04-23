import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Common/Types/user';
import { HttpClient } from '@angular/common/http';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Company } from 'src/app/Common/Types/company';
import { Admin } from 'src/app/Common/Types/admin';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  farmerList: Farmer[] = [];
  companyList: Company[] = [];
  adminList: Admin[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users')
      .subscribe((data: User[]) => {
        console.log(data);
        data.forEach((user: User) => {
          if (user.role_id == 1) {
            this.adminList.push(User.toAdmin(user));
          }
          if (user.role_id == 2) {
            this.companyList.push(User.toCompany(user))
          } 
          if (user.role_id == 3) {
            this.farmerList.push(User.toFarmer(user));
          }
        });
      });
  }

  deleteUser(id: number) {
    console.log(id);
  }

  editUser(id: number) {
    console.log(id);
  }

}
