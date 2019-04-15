import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { body } from './model';
import { master } from './model';
import { pdt_model } from './model';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { UpdateService } from'../../../services/update.service';
import { SharingService } from '../../../services/sharing.service';
import { figure } from './model';



@Component({
  selector: 'update-invoice-b2b',
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
  
})
export class Update_invoice_b2b  {
  

 
   
   i : number = -1;
   k : number = -1;
   z : number = -1;
   j : number;
   default_greet : string = '';

   company_name : string = 'VADAKKUMNATHAN AGENCIES';
   company_gst : string = '32ACVFS0267J1ZQ';
   invoice_number : number = 0;
   dip_invo_number : number;
   po_body = new body(1,1);
   
   bill_obs : any;
   is_loaded : boolean = false;
  
   isServer_res : boolean = false




   isClickedOnce : boolean = false;
   disabled_button : boolean =true; 
   isPrint : boolean = true;
   total_paid_today : number = 0;
   total_due : number = 0;
   customer_name : string = '';
   item_price : number[] =[];
   net_total : number[] =[];
   is_invo_num_loaded : boolean = false
     
   arrayOfKeyValues: any[] = [];
   arrayOfCusValues : any[] =[];

    product_array : pdt_model[] =[];
   fig_model = new figure(0,0,'');
  stock_check : number = 0;
  figured_out : string;
  fig_main : string ;
  fig_sub : string ;
  figured_out2 : string;
  fig_main2 : string ;
  fig_sub2 : string ;
  floor : number;
  frac : number;
 
  date_change_flag : number = -1;
  myDate = new Date();
  today: number = Date.now();
  total_qty : number = 0;
  b : number = 0;
  invo_change_flag : number = 0;

   

  

  pre_total_paid : number = 0;
  snak_msg : string = '';
  constructor(private fb: FormBuilder, private ds :DataService, private router : Router,
    private ss: SharingService, private us : UpdateService) { }
 ngOnInit() {

   this.clear_data();
    
    this.invoice_number = this.us.get_invoice_number_b2b();
    // this.push_items(1);
    this.get_master_slave();
    this.get_products()
  
    
     }


clear_data()
{
  
  for (this.b = this.ss.invoice_model.items.length ; this.b > 0 ; this.b--)
   {
      this.ss.invoice_model.items.pop();
     
   }

    for (this.b = this.ss.invoice_model.taxes.length ; this.b > 0 ; this.b--)
   {
      this.ss.invoice_model.taxes.pop();
     
   }

}


get_products()
{
    this.ds.get_products_list()
              .subscribe((jsonData) => { this._get_products(jsonData)
                      },(err) => console.error(err),
                       
                      );

}
      _get_products(json :any)
        {     
            this.arrayOfKeyValues = json;
            this.product_array = json;
            this.isServer_res = true;
       
         }

change_qty(qty:any)
{
   this.ss.invoice_model.items[this.k].QTY = qty;
   this.calculation();
}  


 change_price(w:number)
{
 
   this.calculation();

}

// calculation()
// {
//   this.ss.invoice_model.items[this.k].NET_PRICE  = this.ss.invoice_model.items[this.k].QTY * this.ss.invoice_model.items[this.k].PRICE;
//   this.ss.invoice_model.items[this.k].NET_PRICE = Math.round(this.ss.invoice_model.items[this.k].NET_PRICE * 100) /100
//    this.ss.invoice_model.sub_total = 0 

//       for(this.j=0;this.j<=this.i+1;this.j++)
//   {
//      this.ss.invoice_model.sub_total = this.ss.invoice_model.sub_total + this.ss.invoice_model.items[this.j].NET_PRICE;
          
//   }

//   this.ss.invoice_model.sub_total =  Math.round(this.ss.invoice_model.sub_total * 100) / 100 ;
  
// }





calculation()
{
  this.ss.invoice_model.items[this.k].NET_PRICE  = this.ss.invoice_model.items[this.k].QTY * this.ss.invoice_model.items[this.k].PRICE;

  this.ss.invoice_model.items[this.k].NET_PRICE = Math.round(this.ss.invoice_model.items[this.k].NET_PRICE * 100) /100
   this.ss.invoice_model.sub_total = 0 
   this.total_qty = 0

      for(this.j=0;this.j<=this.i+1;this.j++)
  {
     this.ss.invoice_model.sub_total = this.ss.invoice_model.sub_total + this.ss.invoice_model.items[this.j].NET_PRICE;
     this.total_qty = (this.total_qty-0) + (this.ss.invoice_model.items[this.j].QTY-0)     
  }

  this.ss.invoice_model.sub_total =  Math.round(this.ss.invoice_model.sub_total * 100) / 100 ;

   this.floor =  Math.floor(this.ss.invoice_model.sub_total);  
   this.frac =  (this.ss.invoice_model.sub_total) % 1;

     if(this.frac > .49)
     {
       this.frac = 1 - this.frac;
       this.floor = this.floor + 1;
     }
   this.get_figure(this.floor);
  
}

get_figure(x:any)
{
    
  this.fig_model.number_to_convert = x;
   this.ds.get_figure(this.fig_model)
   .subscribe((jsonData) => { this.getjson87(jsonData)
                      },(err) => console.error(err),
                       
                      );

}

getjson87 (p:any)
{
 
   this.fig_main = p.msg;
   this.isClickedOnce = false;
 
}











get_grand_total(gt: any)
{

  this.ss.invoice_model.grand_total = gt
}


        

 push_items( si : number )
    
           {  
               
               this.ss.invoice_model.items.push({ "SI_NO":si, "PRODUCT_NAME":'',"HSN_CODE":'',"QTY":1,"TAX":0,
               "PRICE":0,"UNIT":"pc","NET_PRICE":0 })
                this.ss.invoice_model.sub_total = 0;
            }




  get_master_slave()
  {
  	  
                        this.po_body.Invo_number = this.invoice_number
                        this.us.get_a_invoice_b2b(this.po_body)
                       .subscribe((jsonData) => { this._get_bill_obs(jsonData)  , this.is_loaded = true
                      },(err) => console.error(err),
                       
                      );
                      

  }

  _get_bill_obs(s:any)
{
 
  console.log('data',s);



 
this.ss.invoice_model.cus_name = s.master.CUSTOMER_NAME;
this.ss.invoice_model.cus_street = s.master.CUSTOMER_STREET;
this.ss.invoice_model.cus_city = s.master.CUSTOMER_CITY;
this.ss.invoice_model.cus_phone = s.master.CUSTOMER_PHONE;
this.ss.invoice_model.cus_gst = s.master.CUSTOMER_GST_IN;
this.ss.invoice_model.cus_mobile = s.master.CUSTOMER_MOBILE;
this.ss.invoice_model.invoice_date = s.master.BILL_DATE;
this.ss.invoice_model.pan_no = s.master.PAN_NO;
this.ss.invoice_model.veh_no =s.master.VEH_NO;
this.ss.invoice_model.place_of_supply =s.master.PLACE_SUPPLY;
this.ss.invoice_model.no_bundles =s.master.BUNDLES;
this.ss.invoice_model.total_pre_paid = s.master.TOTAL_PAYED;
this.ss.date_change_flag = 2;
this.ss.invoice_model.total_due = s.master.TOTAL_DUE;
this.ss.invoice_model.INVOICE_NUMBER = s.master.INVOICE_NUMBER;
this.ss.invoice_model.total_paid_today = 0;
this.ss.invoice_model.length = s.master.ITEM_LENGTH;
console.log('len_num',this.ss.invoice_model.length)
this.ss.invoice_model.invo_num_flag = 1;
this.invo_change_flag = 2


      for(this.j=0;this.j<s.slave.length;this.j++)
      {


         this.push_items(this.j + 1);  

      
         this.ss.invoice_model.items[this.j].HSN_CODE = s.slave[this.j].HSN_CODE;
         this.ss.invoice_model.items[this.j].SI_NO = s.slave[this.j].SI_NO;
         this.ss.invoice_model.items[this.j].PRODUCT_NAME = s.slave[this.j].PRODUCT_NAME;
         this.ss.invoice_model.items[this.j].PRICE = s.slave[this.j].PRICE;
         this.ss.invoice_model.items[this.j].QTY = s.slave[this.j].QUANTITY;
         this.ss.invoice_model.items[this.j].NET_PRICE = s.slave[this.j].QUANTITY * s.slave[this.j].PRICE;

      }

      this.i = s.slave.length - 2;
      this.k =  s.slave.length -1;
      // this.calculation();


}

change_date()
{
  this.ss.date_change_flag = 0;
}
catch_invoice_date(s:any)
{ 
  
   this.ss.date_change_flag = 2 ;
 
   this.ss.invoice_model.invoice_date = s._validSelected.toLocaleDateString();

 
}

  change_one(item_name:any)
{
    let s : any; 
  
s = this.product_array.filter(xi=> xi.PRODUCT_NAME === item_name);

if(s.length > 0)
{
this.ss.invoice_model.items[this.k].PRODUCT_NAME = s[0].PRODUCT_NAME;
this.stock_check = s[0].AVAIL_QTY ;
this.ss.invoice_model.items[this.k].HSN_CODE = s[0].HSN_CODE;
this.ss.invoice_model.items[this.k].UNIT = s[0].UNIT;
this.ss.invoice_model.items[this.k].TAX = s[0].TAX;

this.calculation();
}
else
{
  //alert('Enter valid Product Name');
  this.snak_fun('Select valid Product')

}


}

focus_one(index:number)
{
  this.k = index ;
}
blur_paid_today(val:any)
{
  this.ss.invoice_model.total_due  =  this.ss.invoice_model.grand_total -
  ((this.ss.invoice_model.total_paid_today-0) + (this.ss.invoice_model.total_pre_paid-0) )  ;


this.ss.invoice_model.total_due  = Math.round(this.ss.invoice_model.total_due * 100) / 100 ;

}
removeItem()
{
  

  this.ss.invoice_model.items.pop();
  this.i = this.i - 1;
  this.k = this.k - 1;
  this.calculation();
  this.ss.invoice_model.length = this.ss.invoice_model.length - 1;
  this.calculation();
 
  // console.log('i',this.i)

}

item_remove_flag()

{
  if(this.i === -1)
  {  return true;  }
  else
  {  return false;  }
}  

print_invoice()
{
  this.isClickedOnce = true;
 
   this.ds.update_invoice_b2b(this.ss.invoice_model)
   .subscribe((jsonData) => { this._get_res_update(jsonData)
                       },(err) => console.error(err),
                    
                       );
}
_get_res_update(json:any)
{
   console.log('res',json);
   if(json.msg === 'Invoice Saved Sucessfully')
   {
     alert('Invoice Saved Sucessfully');
     window.print();
   }

}
snak_fun(msg:string)
{
      this.snak_msg = msg;
      var x = document.getElementById("snackbar");
      x.className = "show";
     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
}




}


















  


