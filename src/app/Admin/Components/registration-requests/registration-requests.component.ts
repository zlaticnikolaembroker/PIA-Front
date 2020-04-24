import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Common/Types/user';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Company } from 'src/app/Common/Types/company';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {
  farmerList: Farmer[] = [] as Farmer[];
  companyList: Company[] = [] as Company[];
  constructor(private http: HttpClient) { }

  confirmUser(id: number, confirmation: boolean){
    this.http.post('http://localhost:3000/users/confirm_user', {
      id,
      confirmation,
    }).subscribe((data) => {
        this.companyList = this.companyList.filter((company) => {
          return company.id !=id;
        });
        this.farmerList = this.farmerList.filter((farmer) => {
          return farmer.id !=id;
        })
      });
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users_unconfirmed').subscribe((data: User[]) => {
          if (data && data !== null) {
            data.forEach((user: User) => {
              if (user.role_id == 2) {
                this.companyList.push(User.toCompany(user));
              } else {
                this.farmerList.push(User.toFarmer(user));
              }
            })
          }
      });
  }

}
