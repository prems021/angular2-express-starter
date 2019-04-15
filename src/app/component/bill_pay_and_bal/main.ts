import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-bill-pay-bal-section',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Bill_pay_balance_Component implements OnChanges {

  @Input() grand_total : number;
 
  j : number = 0;
  
   total_due : number = 0
   total_paid : number = 0
   is_partial_pay : boolean = true;

  
     constructor(private router: Router , private ss : SharingService , private ds : DataService) { }
  
 ngOnInit() {

               
               
            }

 
  ngOnChanges(changes: SimpleChanges) {
    this.update_change();
  }



on_focus_total_paid()
{
  this.total_due = this.grand_total - this.total_paid;
  this.total_due  =  Math.round(this.total_due * 100) / 100;
  
}
keyup_on_paid_today(val: number)
{
   this.ss.invoice_model.total_due = this.grand_total - this.total_paid;
   this.ss.invoice_model.total_due  =  Math.round(this.ss.invoice_model.total_due * 100) / 100;
   this.ss.invoice_model.total_paid_today = val;

 
}


update_change()
{
  this.on_focus_total_paid();
  
 
}


 




 
}
