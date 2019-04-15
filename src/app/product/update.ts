import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-update-product',
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update_product implements OnInit {

 productForm: FormGroup;
 d_ : number = 0;
 snak_msg : string = '';
 arrayOfCusValues : any[] =[];
 post : any = {"f":"k"};
 units = ['pc','ltr','mtr','barrel','set','Nos','pkt','box','kg','gm','ton'];
     constructor(private router: Router, private ds: DataService ,private fb: FormBuilder) {
    
     
    
  }
  

  ngOnInit() {
                  this.get_products();
     
    this.productForm = this.fb.group({ 

      product_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      hsn_code : [''],   
      opening_stock : '',    
      price:[''],
      avail_qty:[''],
      unit:['']
    
    });
    
  }


  get_products()
  {
       this.ds.get_product_list()
  .subscribe((jsonData) => { this.p_r(jsonData)
                      },(err) => console.error(err),
                      
                      );
  }
  p_r(json:any)
  {
     this.arrayOfCusValues = json;
   

  }
 

  cus_blur(ss:any)
  {
        let s : any; 

s = this.arrayOfCusValues.filter(xi=> xi.PRODUCT_NAME === ss);

console.log(s);

      this.productForm.patchValue({product_name : ss , hsn_code : s[0].HSN_CODE , product_type : s[0].P_TYPE, net_price : s[0].NET_PRICE, tax : s[0].TAX , 
         avail_qty : s[0].AVAIL_QTY ,  net_purchase_price : s[0].NET_PURCHASE_PRICE , unit : s[0].UNIT,price : s[0].PRICE });
  }


  

  update_product()
  {
      this.ds.update_product(this.productForm.value)
      .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                     
                      );

  
  }

     getjson(json :any)
  {
    
  
   if (json.msg ==='Successfully updated')
   {
      alert('Product Updated')
      this.router.navigate(['/dash']);
   }

  
   else{
      alert('Something wrong try again')
      this.router.navigate(['/dash']);
   }
   
  }





  get_res(json:any)
  {
    var x = 1
      if(x > 0)
      {
       this.snak_fun(json.msg); 
       x = -2;
      }
   
    
  }
snak_fun(msg:string)
{
      this.snak_msg = msg;
      var x = document.getElementById("snackbar");
      x.className = "show";
     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    
}


}