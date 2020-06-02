import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location } from "@angular/common";

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
  currentUrl: string;

  constructor(private cookieService : CookieService, private router: Router, private location: Location) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = location.path();
        this.init();
      }
    });
  }

  init(): void {
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
    if(role) {
      this.posibleRoutes  = [
        {href:  homeHref, title: 'Home'},
        {href: '/login', title:'Logout'},
        { href: '/change-password', title: 'Change password' }
      ];
    } else {
        this.posibleRoutes  = [
          {href: '/login', title: 'Login'},
          {href: '/register', title:'Register'},
        ];
        if (this.currentUrl !== '/login' && this.currentUrl !== '/register') {
          this.router.navigate(['login']);
        }
      }
    if(role && this.currentUrl && !this.currentUrl.includes(homeHref) && this.currentUrl !== '/change-password') {
      this.router.navigate([homeHref]);
    }
  }

  ngOnInit(): void {
  }

  logout = () => {
    this.cookieService.delete('userRole','/');
    this.cookieService.delete('userId','/');
    this.cookieService.delete('garden_id','/');
    this.router.navigate(['/login']);
  }

}
