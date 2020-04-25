import { Component, OnInit, Input } from '@angular/core';
import { Farmer } from 'src/app/Common/Types/farmer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  @Input() user: Farmer;
  @Input() update: Function;

  tempUser: Farmer;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tempUser = this.user;
  }

  back() {
    this.router.navigate(['/admin/user-list'])
  }

}
