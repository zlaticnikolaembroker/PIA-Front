import { Component, OnInit } from '@angular/core';
import { Garden } from '../../types/Garden';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.component.html',
  styleUrls: ['./farmer-dashboard.component.css']
})
export class FarmerDashboardComponent implements OnInit {

  gardens: Garden[];
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/farmer/gardens/' + this.cookieService.get("userId")).subscribe((data: Garden[]) => {
          this.gardens = data;
      });
  }

  detailsClicked(id) {
    console.log(id);
  }

  warehouseClicked(id) {
    console.log(id);
  }

}
