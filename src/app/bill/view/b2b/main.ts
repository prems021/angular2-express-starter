import { Component,OnInit,TemplateRef, ViewChild  } from '@angular/core';

import {  UpdateService } from '../../../services/update.service';
import { DataService } from '../../../services/data.service';
import { invoices } from './model';
import { columns, Company, data } from './assets';
import { Columns } from 'ngx-easy-table';
import { ConfigService } from './config';

import { Router } from '@angular/router';
@Component({
    selector: 'invoice-all',
    templateUrl: './main.html',
    styleUrls: ['./main.css'],
   
})
export class Invoiceall_b2b {
    @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;
  columns: Columns[] = [];
  data: Company[] = [];

  configuration;
 
  clicked : number = 0;
  view : boolean = false;

 constructor( private ds : DataService, private uS: UpdateService, private rs: Router  )
 {
       this.configuration = ConfigService.config;
   // this.data = data;
    this.columns = columns;
 }
  
  ngOnInit() {
   
   this.get_invoices();
       
  }


 get_invoices()
  {
    this.ds.get_invoices_b2b()
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

  }

  getjson(s:any)
  {
    console.log(s);
   this.data = s;
     this.view = true;
  }

   eventEmitted($event) {

     

     if($event.event == 'onSearch')
     {
         
     }
     else
     {
        this.clicked = $event.value.row.INVOICE_NUMBER;
      alert("Selected Invoice Number  " + this.clicked);
           this.uS.invo_number_b2b = this.clicked

          this.rs.navigate(['/update-all-b2b']);

     }


   

   


 
  }

   
}