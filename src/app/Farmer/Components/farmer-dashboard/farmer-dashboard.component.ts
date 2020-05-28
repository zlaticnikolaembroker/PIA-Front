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

  gardensToMaintenance: Garden[];
  gardens: Garden[];
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/farmer/gardens/' + this.cookieService.get("userId")).subscribe((data: Garden[]) => {
          this.gardens = data;
          this.gardensToMaintenance = this.gardens.filter((garden) => {
            return garden.temperature < 12 || garden.water < 75;
          })
      });
  }

  detailsClicked(id) {
    this.router.navigate(['farmer/garden/' + +id])
  }

  warehouseClicked(id) {
    console.log(id);
  }

}
