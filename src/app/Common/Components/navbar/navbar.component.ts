import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface Route {
  title: string;
  href: string;
}

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  posibleRoutes: Route[];

  constructor(private cookieService : CookieService, private router: Router) { 
    this.init();
  }

  init(): void {
    const currentRoute = this.router.url;
    const role = this.cookieService.get('userRole');
    let homeHref = ''; 
      switch(+role) {
      case 1: {
        homeHref =  'admin';
        break;
      }
      case 2: {
        homeHref = 'company';
        break;
      }
      case 3: {
        homeHref =  'farmer';
        break;
      }
    }
    if(role && currentRoute !== '/login' && !currentRoute.includes(homeHref)) {
      this.router.navigate([homeHref]);
    }
    if(role) {
      this.posibleRoutes  = [
        {href:  homeHref, title: 'Home'},
        {href: '/login', title:'Logout'},
      ];
    } else {
        this.posibleRoutes  = [
          {href: '/login', title: 'Login'},
          {href: '/register', title:'Register'},
        ];
      }
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.init();
    })
  }

  logout = () => {
    this.cookieService.deleteAll();
  }

}
