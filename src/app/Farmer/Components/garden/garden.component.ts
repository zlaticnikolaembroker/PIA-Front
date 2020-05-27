import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Garden } from '../../types/Garden';
import { Seedling } from '../../types/Seedling';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css']
})
export class GardenComponent implements OnInit {

  garden: Garden;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
  }

  private seedlingsMap: Seedling[][];

  private createSeedlingMap() {
    this.seedlingsMap = [];
    for (let i = 0; i < this.garden.width; i++) {
      this.seedlingsMap[i] = [];
      for (let j=0; j < this.garden.height; j++) {
        this.seedlingsMap[i][j] = this.garden.seedlings.find((value) => {
          if (value.x == i+1 && value.y == j+1) {
            return value;
          }
        })
      }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params['gardenId']) {
        this.http.get('http://localhost:3000/farmer/garden/' + +params['gardenId']).subscribe((data: Garden) => {
          this.garden = data;
          this.createSeedlingMap();
        });
      }
    });
  }

  addWater() {
    this.http.post('http://localhost:3000/farmer/garden/water_change', {
      id: this.garden.id,
      temp_change: 1,
    })
    .subscribe(() => {
      this.garden.water++;
    });
  }

  substractWater() {
    this.http.post('http://localhost:3000/farmer/garden/water_change', {
      id: this.garden.id,
      temp_change: -1,
    })
    .subscribe(() => {
      this.garden.water--;
    });
  }

  addTemp() {
    this.http.post('http://localhost:3000/farmer/garden/temperature_change', {
      id: this.garden.id,
      temp_change: 1,
    })
    .subscribe(() => {
      this.garden.temperature++;
    });
  }

  substractTemp() {
    this.http.post('http://localhost:3000/farmer/garden/temperature_change', {
      id: this.garden.id,
      temp_change: -1,
    })
    .subscribe(() => {
      this.garden.temperature--;
    });
  }

}
