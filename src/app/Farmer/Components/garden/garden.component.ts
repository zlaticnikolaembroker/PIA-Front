import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Garden } from '../../types/Garden';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css']
})
export class GardenComponent implements OnInit {

  garden: Garden;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      if (params['gardenId']) {
        this.http.get('http://localhost:3000/farmer/garden/' + +params['gardenId']).subscribe((data: Garden) => {
        this.garden = data;
        console.log(this.garden);  
      });
      }
    });
  }

}
