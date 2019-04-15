import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { body } from './model';
import { master } from './model';
import { pdt_model } from './model';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { UpdateService } from'../../../services/update.service';
import { figure } from './model';


@Component({
  selector: 'update-invoice-b2b',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Update_invoice_b2c  {

   
   i : number = -1;
   k : number = -1;
   z : number = -1;
   j : number;

   company_name : string = 'Sreedhar Jewellers';
   company_gst : string = '32ACVFS0267J1ZQ';
   invoice_number : number = 0;
   dip_invo_number : number;
   po_body = new body(1,1);
   bill_obs : any;
   is_loaded : boolean = false;
   post_invo = new master(0,'','','','','',0,0,'',0,0,0,0,0,0,0,0,0,0,0,true,[]);
   isServer_res : boolean = false




   isClickedOnce : boolean =true;
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


  

 
  pre_total_paid : number = 0;
  default_greet : string = '';
  snak_msg : string = '';
  constructor(private fb: FormBuilder, private ds :DataService, private router : Router, private us : UpdateService) { }
 ngOnInit() {

    // this.get_default_greet();
    // this.invoice_number = this.us.get_invoice_number_b2c();
    // this.get_master_slave_b2c();
   
   
  }
}