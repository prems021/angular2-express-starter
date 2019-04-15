import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../../services/sharing.service';
import { DataService } from '../../../services/data.service';
import { i_number } from './model';


@Component({
  selector: 'app-bill-top-b2b',
  templateUrl: './b2b.html',
  styleUrls: ['./b2b.css']
})
export class B2b_top_Component implements OnInit {

  
  arrayOfCusValues : any[] =[];
  invoice_number_gets = new i_number('',1);

  is_invo_num_loaded : boolean = false;
  dip_invo_number : number;

  
  
     constructor(private router: Router , private ss : SharingService , private ds : DataService) { }
  

  ngOnInit() {

               this.get_customers();
               
              }


 


  get_customers()
{
   this.ds.get_customers_list_b2b()
  .subscribe((jsonData) => { this.get_customer_res(jsonData)
                      },(err) => console.error(err),
                       
                      );
}
get_customer_res(json:any)
{ 
  this.arrayOfCusValues = json;
}

cus_blur(p:any)
{
  let s : any; 

s = this.arrayOfCusValues.filter(xi=> xi.CUSTOMER_NAME === p);


if(s.length != 0)
{
this.ss.invoice_model.cus_name = s[0].CUSTOMER_NAME;
this.ss.invoice_model.cus_street = s[0].STREET;
this.ss.invoice_model.cus_city  = s[0].CITY;
this.ss.invoice_model.cus_phone = s[0].PHONE;
this.ss.invoice_model.cus_mobile = s[0].MOBILE;
this.ss.invoice_model.cus_gst = s[0].GSTIN;
}

else
{
this.ss.invoice_model.cus_name  = p;
}

}



catch_invoice_date(s:any)
{ 
  
   this.ss.date_change_flag = 2 ;
 
   this.ss.invoice_model.invoice_date = s._validSelected.toLocaleDateString();

 
}

change_date()
{
  this.ss.date_change_flag = 0;
}

removeItem()
{
  this.ss.invoice_model.items.pop()
}
}
