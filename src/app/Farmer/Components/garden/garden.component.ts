import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Garden } from '../../types/Garden';
import { Seedling } from '../../types/Seedling';

interface Slot {
  x: number,
  y: number,
}

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css']
})
export class GardenComponent implements OnInit {

  garden: Garden;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
  }

  selectedSlot;
  message: string = '';

  hoveredSeedling: Seedling;
  seedlingsMap: Seedling[][];

  emptySlosts: Slot[] = [];

  seedlings: Seedling[];
  selectedSeedling: Seedling;

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
    this.seedlingsMap.forEach((row, i) => {
      row.forEach((column, j) => {
        if (!column) {
          this.emptySlosts.push({
            x: i + 1,
            y: j + 1,
          });
        }
      })
    });
  }

  ngOnInit(): void {
    this.hoveredSeedling = null;
    this.route.params.subscribe( params => {
      if (params['gardenId']) {
        this.http.get('http://localhost:3000/farmer/garden/' + +params['gardenId']).subscribe((data: Garden) => {
          this.garden = data;
          this.createSeedlingMap();
        });
        this.http.get('http://localhost:3000/farmer/garden/seedlings/' + +params['gardenId']).subscribe((data: Seedling[]) => {
          this.seedlings = data;
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

  handleHover(seedling){
    this.hoveredSeedling = seedling;
  }

  handleMouseOut() {
    this.hoveredSeedling = null;
  }

  handleSeedlingClicked(seedling) {
    console.log(seedling);
    this.router.navigate(['/farmer/seedlings/' + seedling.id]);
  }

  addSeedling() {
    this.message = '';
    if (!this.selectedSlot) {
      this.message = "Please, select slot before planting";
      return;
    }
    if (!this.selectedSeedling) {
      this.message = "Please, select seedling before planting";
      return;
    }
    const SelectedSeedling = this.seedlings.find((s) => {
      //@ts-ignore
      return s.id == this.selectedSeedling;
    });
    this.http.post('http://localhost:3000/farmer/plant_seedling', {
      x: (+this.selectedSlot.split(':')[0]),
      y: (+this.selectedSlot.split(':')[1]),
      garden_id: this.garden.id,
      seedling_id: SelectedSeedling.id,
      company_id: SelectedSeedling.company_id,
      name: SelectedSeedling.name,
      time_to_grow: SelectedSeedling.time_to_grow,
    })
    .subscribe(() => {
      this.ngOnInit();
      this.selectedSeedling = null;
      this.selectedSlot = null;
    });
  }

  changeStatus(e) {
    console.log((e.target.value as Slot).x);
  }

}
