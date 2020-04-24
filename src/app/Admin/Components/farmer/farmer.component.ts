import { Component, OnInit, Input } from '@angular/core';
import { Farmer } from 'src/app/Common/Types/farmer';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  @Input() user: Farmer;
  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
  }

}
