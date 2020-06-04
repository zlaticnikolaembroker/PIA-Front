import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seedling',
  templateUrl: './seedling.component.html',
  styleUrls: ['./seedling.component.css']
})
export class SeedlingComponent implements OnInit {

  seedling;
  constructor(private http: HttpClient, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => {
      if(params['seedling_id']) {
        this.http.get('http://localhost:3000/farmer/seedling/' + params['seedling_id']).subscribe((data) => {
          this.seedling = data;
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
