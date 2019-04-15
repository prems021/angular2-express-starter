import { Component,OnInit } from '@angular/core';

import {  UpdateService } from '../../services/update.service';
import {  ReportService } from '../../services/report.service';
import { DataService } from '../../services/data.service';

import { Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { items } from './model';
import { sublist } from './model';
@Component({
    selector: 'sales',
    templateUrl: './main.html',
    styleUrls: ['./main.css']
})
export class SalesReport {
  
   
    data : any [] =[];
    post_invo = new items(1,[]);
    total_amount : number = 0;
    pdtlist : any [] = [];
    qty_list : any [] = [];
    amount_list : any [] = [];
    items = [];
    itemCount = 0;
    to_date : string;
    from_date : string;
    view : boolean = false;
    length : number = 0;
    total_revenue : number =0;
     total_tax :number = 0;
     today: number = Date.now();
     total_due : number = 0;
     bool : boolean ;
     si : number = 0;
      j :number = 0;
     index : number = 0;
       dateFormm = this.fb.group({                  
                                                  
                                                  from_date : '1987-09-10',
                                                  to_date: '2055-08-09',
                                                  option : 2
                                                 
                                              
                                         });

    constructor( private fb: FormBuilder, private ds : DataService, private uS: UpdateService, private rs: Router ,private Rs: ReportService ) {
       
    }
ngOnInit() {
   
   this.get_reports();
    
   
  }
print_re()
{
  window.print();
}
 auto_push()
  {
        this.post_invo.item.push({ "SI":1, "PRODUCT_NAME":'xxx',"QUANTITY":0,"AMOUNT" :0, "UNIT":'pc' })

               }

 get_reports()
  {

    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date;



    this.dateFormm.patchValue({from_date:  this.from_date, to_date: this.to_date })

    
    this.ds.get_sales_report(this.dateFormm.value)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

  }

  getjson(s:any)
  {

     this.view = true;
     this.data = s;
     
     this.length = this.data.length;
    
   this.express(this.length)

  }

  express(s: number)
  {
      
       for(var ix = 0; ix < s ; ix++)
       {
      
this.bool = this.check_list(this.data[ix].PRODUCT_NAME);

if ( this.bool === false)
{
  this.pdtlist[this.j] = this.data[ix].PRODUCT_NAME;
  this.qty_list[this.j] = this.data[ix].QUANTITY;
  
  this.auto_push();
  this.post_invo.si = this.j+1;
  this.post_invo.item[this.j].PRODUCT_NAME = this.data[ix].PRODUCT_NAME;
  this.post_invo.item[this.j].QUANTITY = this.data[ix].QUANTITY;
  this.post_invo.item[this.j].SI = this.j+1;

  
 

 this.j = this.j + 1;
  
}
else 
{

 this.post_invo.item[this.index].QUANTITY = this.data[ix].QUANTITY + this.post_invo.item[this.index].QUANTITY;
 
 

}




       }
  
    
  }

 check_list( a :any) : boolean
 {

  var i =0; var k = 0;
   for(i;i<this.pdtlist.length;i++)
                 {
                       if(this.pdtlist[i] === a )
                       {
                          k = 1;
                          this.index = i;
                          return true;
                       }
                 }
     if (k === 0)
     {
       return false;
     }
  
 }
print_report()
{
  window.print();
}
 
}