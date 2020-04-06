import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Route {
  title: string;
  href: string;
  active: boolean;
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  posibleRoutes: Route[];
  constructor(private activeRoute: Router) { 
    console.log(this.activeRoute.isActive('login', false));
    this.posibleRoutes  = [
      {href: '/login', title: 'Login', active: false},{href: '/register', title:'Register', active: true}
    ];
   }

  ngOnInit(): void {

  }

}
