import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'src/app/Common/Types/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() user: Company;

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
  }

}
