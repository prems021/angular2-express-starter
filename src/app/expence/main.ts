import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { exp_invos } from './model';
import { pdt_model } from './model';


@Component({
  selector: 'app-expence-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Expence_main implements OnInit {

  catForm: FormGroup;
  customer_u_Form: FormGroup;
  customer_d_Form: FormGroup;
  arrayOfCusValues : any[] =[];
  is_rec_no : number = 1;
  exp_entry_no : number = 1;
  from_date : string;
  is_itemss : number = 1;
  purchases : any [] = [];
  exp_invos = new exp_invos(1,'Purchase',0,[],'',0,0,'');
  arrayOfKeyValues :  any [] =[];
   k : number = -1;
   product_array : pdt_model[] =[];
   j : number = 0 ;
   grand_total : number = 0;
  constructor( private fb: FormBuilder, private ds :DataService, private router : Router ) { } 

  ngOnInit() {
  
   
    this.get_products();
    this.get_exp_reciept_no();
    this.get_exp_type_list();
    this.get_third_party();
    
    this.catForm = this.fb.group({ 

      Category_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      
      
    });



      this.customer_d_Form = this.fb.group({ 

      customer_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      street : '',
      city : '',
      gstin :'',
      ph1 :'',
      ph2 : '',
      opbal : '',
      last_invo_num : ''
      
    });


document.getElementById("defaultOpen").click();
    
    
  }

save_expense()
{

  if(this.exp_invos.Exp_catogory === 'Purchase')
  {
    alert ('Enter purchase catogory on purchase menu');
  }
  else
  {
       console.log('ec',this.exp_invos);
  this.ds.save_other_expense(this.exp_invos)
    .subscribe((jsonData) => { this.getjson49(jsonData)
                      },(err) => console.error(err),
                       
                      );
  }

  
}
getjson49(json :any)
  {
   alert(json.msg);
   this.router.navigate(['/dash']);
  }

get_third_party()
{
   this.ds.get_party_list()
  .subscribe((jsonData) => { this.getjson45(jsonData)
                      },(err) => console.error(err),
                       
                      );
}

getjson45(json :any)
  {
   this.arrayOfCusValues = json;
  }
get_exp_type_list()
{
   this.ds.get_exp_type_list()
      .subscribe((jsonData) => { this.getjsonss(jsonData)
                      },(err) => console.error(err)
                     
                      );

}

getjsonss(json :any)
  {
    
   
   for( var i = 0 ; i < json.length; i++)
  this.purchases[i] = json[i].CATEGORY_NAME;
  }



 get_exp_reciept_no()
 {
    this.ds.get_exp_rec_no()
              .subscribe((jsonData) => { this._get_rec_no(jsonData)
                      },(err) => console.error(err),
                       
                      );
 }
_get_rec_no(json :any)
        {     
            console.log('ci',json);
            this.exp_invos.E_ENTRY_NUMBER = json.count+1
            this.is_rec_no = 1;
        
       
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
            console.log('json',json);
            // this.isServer_res = true;
       
         }



addItem()
{
  this.exp_invos.items.push({"SI_NO":1,"PRODUCT_NAME":'',"QTY":1,"UNIT":'',"HSN_CODE":0,"PRICE":0,"NET_PRICE":0})
}
add_cat()
{
  console.log(this.catForm.value);
  this.ds.add_expense_category(this.catForm.value)
      .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err)
                      
                      );


}
 getjson(json :any)
  {
    
  
   if (json.msg ==='Successfully saved')
   {
      alert('Category added sucessfully')
      this.router.navigate(['/dash']);
   }

   else if (json.msg === 'Category name already existed')
   {
      alert('Category already existed')
      this.router.navigate(['/dash']);
   }
  }














focus_one(index:number)
{
  this.k = index ;
}

  change_one(item_name:any)
{
    let s : any; 
s = this.product_array.filter(xi=> xi.PRODUCT_NAME === item_name);

if(s.length > 0)
{

this.exp_invos.items[this.k].PRODUCT_NAME = s[0].PRODUCT_NAME;
this.exp_invos.items[this.k].UNIT = s[0].UNIT;
this.exp_invos.items[this.k].HSN_CODE = s[0].HSN_CODE;


 }
   
 else

 {

 }    
   
       
 }

 change_qty(qty:any)
 {
   this.exp_invos.items[this.k].QTY = qty
   
        this.cal_net_price();
   
 }

 change_price(price:any)
 {

   this.exp_invos.items[this.k].PRICE = price;

  
   this.cal_net_price();
    
 }

cal_net_price()
{
  this.exp_invos.items[this.k].NET_PRICE = this.exp_invos.items[this.k].PRICE * this.exp_invos.items[this.k].QTY;

   this.exp_invos.grand_total = 0; 


   for(this.j=0;this.j<this.exp_invos.items.length;this.j++)
  {

    this.exp_invos.grand_total  = this.exp_invos.grand_total  + this.exp_invos.items[this.j].NET_PRICE;
  }

}

cat_from_date(s:any)
{ 
    
   this.exp_invos.Date = s._validSelected.toLocaleDateString();

}

cat_to_date(s:any)
{ 
    
   this.exp_invos.Date = s._validSelected.toLocaleDateString();

}

cus_blur(name:any)
{
  this.exp_invos.Vendor_name =name;
}
billno_blur(no:any)
{
  this.exp_invos.Bill_no = no
}
Save_purchase()
{

  console.log('invo',this.exp_invos); 
  this.ds.add_expence_entry(this.exp_invos)
  .subscribe((data) => { this.res(data)
                      },(err) => console.error(err),
                       
                     );
}

res(json:any)
{
  console.log('j',json)
  if (json.msg === "Successfully saved")
  
   alert('Purchase Saved')

 this.router.navigate(['/dash']);

}


 openCity(evt, cityName) {

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}




   
}