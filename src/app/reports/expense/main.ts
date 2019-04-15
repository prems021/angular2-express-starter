

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UpdateService } from '../../services/update.service';
import { ReportService } from '../../services/report.service';


@Component({
  selector: 'revenue-report',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Expense_report implements OnInit {
 

   arrayOfKeyValues: any[] = [];
   isclicked : boolean= false;
   avil_qty : any;
   view : boolean = false;
   product_array : any [] = [];
   to_date : string;
   from_date : string;
        dateForm = this.fb.group({                  
                                                  
                                                  from_date : '',
                                                  to_date: '',
                                                  option : 2
                                                 
                                              
                                         });


  constructor(private fb: FormBuilder, private router: Router ,private Rs: ReportService,
   private ds: DataService , private us : UpdateService) {   }
  ngOnInit()  {
                   
     
                     this.get_report();

              }
  
get_report()
{
    this.from_date = this.Rs.from_date ;
    this.to_date = this.Rs.to_date ;
    this.dateForm.patchValue({from_date:  this.from_date, to_date: this.to_date })

    
    this.ds.get_report_expense(this.dateForm.value)
       .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                      
                      );

 } 
  

      getjson(json :any)

  {
    console.log('js',json);
    this.view = true;
this.product_array = json;
console.log(this.product_array);
   
  }


print_report()
{
  window.print();
}
 
 
   
  }

