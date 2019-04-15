import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add_product.html',
  styleUrls: ['./add_product.css']
})
export class Add_product implements OnInit {

 productForm: FormGroup;
 d_ : number = 0;
 snak_msg : string = '';
 units = ['pc','ltr','mtr','barrel','set','Nos','pkt','box','kg','gm','ton'];
     constructor(private router: Router, private ds: DataService ,private fb: FormBuilder) {
    
     
    
  }
  

  ngOnInit() {

    this.productForm = this.fb.group({ 

      product_name : ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      hsn_code : ['',[<any>Validators.required, <any>Validators.minLength(1),<any>Validators.maxLength(10)]],
     
      opening_stock : '',
     
      price:[''],
      unit:['']
    
    });
    this.enter_def_tax();
  }



 
 enter_def_tax()
  {

    this.productForm.patchValue({opening_stock:0,price:0 });
  }



  add_product()
  {
      this.ds.add_product(this.productForm.value)
      .subscribe((jsonData) => { this.get_res(jsonData)
                      },(err) => console.error(err),
                     
                      );
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