import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface Orders {
  date: Date;
  orders: number;
}

interface CompanyOrderData {
  date_of_order: Date;
  count: number;
}

@Component({
  selector: 'app-report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  STATISTICS: Orders[] = [];
  title = 'Bar Chart';
  private width: number;
  private height: number;
  private margin = {top: 20, right: 10, bottom: 30, left: 80};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.generateDays();
  }

  orders: number[];

  private compareDates(date1: Date, date2: Date): boolean {
    if (date1.getDate() == date2.getDate() && 
        date1.getFullYear() == date2.getFullYear() && 
        date1.getMonth() == date2.getMonth()) {
      return true;
    }
    return false;
  }

  private generateDays() {//company/orders/:id
    for(let i =0; i < 30; i++){
      let newDate = new Date();
      newDate.setDate(newDate.getDate() - i)
      this.STATISTICS.push({
        date: newDate,
        orders: 0,
      } as Orders);
    }
    this.http.get('http://localhost:3000/company/report/' + this.cookieService.get('userId'))
    .subscribe((data: CompanyOrderData[]) => {
      data.forEach((element) => {
        this.STATISTICS.forEach((order, index) => {
          if (this.compareDates(order.date, new Date(element.date_of_order))) {
            this.STATISTICS[index].orders = +element.count;
          }
        })
      });
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
    });
    this.http.get('http://localhost:3000/company/orders/' + this.cookieService.get('userId'))
    .subscribe((data: any[]) => {
      this.orders = [];
      data.forEach((element) => {
        this.orders.push(+element.id);
      });
    });
  }

  private initSvg() {
      this.svg = d3.select('svg');
      this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
      this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
      this.g = this.svg.append('g')
          .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
      this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
      this.x.domain(this.STATISTICS.map((d) => d.date.toUTCString().substr(5,11)));
      this.y.domain([0, d3Array.max(this.STATISTICS, (d) => d.orders)]);
  }

  private drawAxis() {
      this.g.append('g')
          .attr('class', 'axis axis--x')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3Axis.axisBottom(this.x));
      this.g.append('g')
          .attr('class', 'axis axis--y')
          .call(d3Axis.axisLeft(this.y).ticks(10, ''))
          .append('text')
          .attr('class', 'axis-title')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Number of orders per day');
  }

  private drawBars() {
      this.g.selectAll('.bar')
          .data(this.STATISTICS)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => this.x(d.date.toUTCString().substr(5,11)) )
          .attr('y', (d) => this.y(d.orders) )
          .attr('width', this.x.bandwidth())
          .attr('height', (d) => this.height - this.y(d.orders) );
  }

}
