import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/Common/Types/admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() user: Admin;
  @Input() update: Function;
  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
    this.update(this.user);
  }

}
