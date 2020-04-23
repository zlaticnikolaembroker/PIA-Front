import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Common/Types/user';
import { HttpClient } from '@angular/common/http';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Company } from 'src/app/Common/Types/company';
import { Admin } from 'src/app/Common/Types/admin';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  farmerList: Farmer[] = [];
  companyList: Company[] = [];
  adminList: Admin[] = [];
  currentUserId: number;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUsers(){
    this.http.get('http://localhost:3000/users')
    .subscribe((data: User[]) => {
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

  ngOnInit(): void {
    this.currentUserId = +this.cookieService.get('userId');
    this.getUsers();
  }

  deleteUser(id: number) {
    this.http.delete('http://localhost:3000/users/' + id as string)
      .subscribe(() => {
        this.adminList = this.adminList.filter((admin) => {
          return admin.id !== id;
        });
        this.farmerList = this.farmerList.filter((farmer) => {
          return farmer.id !== id;
        })
        this.companyList = this.companyList.filter((company) => {
          return company.id !== id;
        })
      });
  }

  editUser(id: number) {
    console.log(id);
  }

}
