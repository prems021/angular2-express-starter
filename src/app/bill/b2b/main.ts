import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SharingService } from '../../services/sharing.service';
import { UpdateService } from'../../services/update.service';
import { pdt_model } from './model';
import { invoice } from './model';
import { figure } from './model';

@Component({
  selector: 'b2b-invoice',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Bill_b2b  {


   i : number = -1;
   k : number = -1;
   z : number = -1;
   j : number;
   total_qty : number = 0;

   company_name : string = 'NEUTECH';
   company_gst : string = ''

  

   isClickedOnce : boolean = false;
   disabled_button : boolean =true; 
   isPrint : boolean = true;
 
   customer_name : string = '';
   is_invo_num_loaded : boolean = false
   isServer_res : boolean = false
  
  
   arrayOfKeyValues: any[] = [];
   arrayOfCusValues : any[] =[];
 


 
 
 
 
  fig_model = new figure(0,0,'');
  product_array : pdt_model[] =[];
  stock_check : number = 0;
  figured_out : string;
  fig_main : string ;
  fig_sub : string ;
  floor : number;
  frac : number;
  date_change_flag : number = 0;
  print_section : boolean = false;
  b: number = 0;
 
 


  constructor(private fb: FormBuilder, private ds :DataService, private router : Router,
                         private us : UpdateService, private ss : SharingService) { }
 ngOnInit() {

     this.get_invo_number();
     this.clear_data()
     this.push_items(1);
     this.get_products();
     
     
   
  }


 get_invo_number()
  {
    this.ds.get_invo_number_b2b().subscribe((jsonData) => { this._get_invo_number(jsonData)  , this.is_invo_num_loaded = true
    },(err) => console.error(err),);
 }


 _get_invo_number(s:any)
{
  // this.invoice_number_gets = s;
  this.ss.invoice_model.INVOICE_NUMBER = s.count + 1;


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

change_date()
{
  this.ss.date_change_flag = 0;
}
    push_items( si : number )
    
           {
           
             if(si > this.ss.invoice_model.items.length)
             {
               
               this.ss.invoice_model.items.push({ "SI_NO":si, "PRODUCT_NAME":'',"HSN_CODE":'',"QTY":1,"TAX":0,
               "PRICE":0,"UNIT":"pc","NET_PRICE":0 })

              }
              else
              {
                 this.reset_ss();
              }
            }

            reset_ss()
            {
             this.z = this.ss.invoice_model.items.length
              while (this.z > 1) 
              {
                 this.ss.invoice_model.items.pop();
                  this.z--
                  
              }
            this.ss.invoice_model.sub_total = 0;
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
this.ss.invoice_model.items[this.k].PRICE = s[0].PRICE;
}
else
{
  alert('Enter valid Product Name');
}


}

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

change_qty(qty:any)
{
   this.ss.invoice_model.items[this.k].QTY = qty;
   this.calculation();
}  


change_price(w:number)
{
 
   this.calculation();

}

catch_invoice_date(s:any)
{ 
  
   this.ss.date_change_flag = 2 ;
 
   this.ss.invoice_model.invoice_date = s._validSelected.toLocaleDateString();

 
}

focus_one(index:number)
{
  this.k = index ;
}

addItem(inx:number)

{
      
      this.i = this.i+1;
      this.push_items(this.i + 2);  
      
     
        
}

RemoveItem(knx : number)
{
  this.ss.invoice_model.items.pop()
  console.log(this.i);
  this.i = this.i - 1;
  this.k = this.k - 1;
  this.calculation();
  console.log('a',this.i);
}

item_remove_flag()

{
  if(this.i === -1)
  {  return true;  }
  else
  {  return false;  }
}  

removeItem()
{
  

  this.ss.invoice_model.items.pop();
  this.i = this.i - 1;

}




get_grand_total(gt: any)
{

  this.ss.invoice_model.grand_total = gt
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

print_invoice()
{
  

  this.ss.invoice_model.length = this.ss.invoice_model.items.length;
 
   

    if(this.ss.invoice_model.cus_name === '')
     {       alert('select a customer');    }

     console.log('s',this.ss.invoice_model.total_due);
     if(this.ss.invoice_model.total_due > 0)
     {
      this.ss.invoice_model.is_partial_pay = true;
     }
 else
 {
  this.ss.invoice_model.is_partial_pay = false;
 }
       
     

      this.ds.post_invoice_b2b(this.ss.invoice_model)
      .subscribe((jsonData) => { this.get_res(jsonData)
                      },(err) => console.error(err),
                     
                      );


     console.log(this.ss.invoice_model);
    
     
}     

get_res(res : any)
{
console.log('res',res);
  true
 if( res.success === true)
   {

     this.print_section = true;
     alert('Invoice Saved')
       window.print();
      this.router.navigate(['/dash']);

    }

    else
    {
      alert(res.msg)
      this.router.navigate(['/dash']);
    }
}
  






}


















  


