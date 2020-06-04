import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-seedling',
  templateUrl: './seedling.component.html',
  styleUrls: ['./seedling.component.css']
})
export class SeedlingComponent implements OnInit {

  seedling;
  preparations: [];
  preparation;
  message: string = '';

  selectedPreparationId: number = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private cookieService: CookieService, private router: Router) { 
    this.init();
  }

  private init() {
    this.route.params.subscribe( params => {
      if(params['seedling_id']) {
        this.http.get('http://localhost:3000/farmer/seedling/' + params['seedling_id']).subscribe((data) => {
          this.seedling = data;
        });
        this.http.get('http://localhost:3000/farmer/garden/preparations/' + this.cookieService.get("garden_id")).subscribe((data: []) => {
          this.preparations = data;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  changePreparation(event) {
    this.selectedPreparationId = +event.target.value;
  }

  usePreparation() {
    this.message = '';
    if (this.selectedPreparationId === null) {
      this.message = "Please, select preparation";
      return;
    }

    this.http.post('http://localhost:3000/farmer/use_preparation', {
      preparation_id: this.selectedPreparationId,
      seedling_id: this.seedling.id,
      garden_id: +this.cookieService.get("garden_id"),
      acceleration_time: this.preparations.find(preparation => {
        //@ts-ignore
        return preparation.id === this.selectedPreparationId;
        //@ts-ignore
      }).acceleration_time,
    }).subscribe(() => {
      this.init();
    });
  }

  private back() {
    setTimeout(() => {
      this.router.navigate(['/farmer/garden/' + +this.cookieService.get("garden_id")])
    }, 2500);
  }

  handleRemove() {
    this.http.post('http://localhost:3000/farmer/remove_seeding', {
      seedling_id: this.seedling.id,
    }).subscribe(() => {
      this.back();
    });
  }

}
