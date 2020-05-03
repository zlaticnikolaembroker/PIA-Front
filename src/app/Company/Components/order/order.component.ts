import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderDetails;
  @ViewChild('pdfTable') private pdfTable: ElementRef;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      if (params['orderId']) {
        this.http.get('http://localhost:3000/company/get_order_details/' + +params['orderId']).subscribe((data) => {
         this.orderDetails = data;
         console.log(data);
      });
      }
    });
   }

   public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }

  ngOnInit(): void {
  }

}
