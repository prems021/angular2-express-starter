import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-bill-pay-bal-section-on-edit',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Bill_pay_balance_Component_on_edit implements OnChanges {

   @Input() grand_total : number;
  @Input() total_pre_paid : number;
 
  j : number = 0;
  
   total_due : number = 0
   total_paid : number = 0
   total_pri_paid : number = 0
   is_partial_pay : boolean = true;

  
     constructor(private router: Router , private ss : SharingService , private ds : DataService) { }
  
 ngOnInit() {

                this.total_due = 0
                 this.total_paid  = 0
                 this.total_pri_paid  = 0
                 this.is_partial_pay = true;
               
            }

 
  ngOnChanges(changes: SimpleChanges) {
    this.update_change();
  }



on_focus_total_paid()
{
  // this.total_due = this.grand_total - this.total_pre_paid;
  // this.total_due  =  Math.round(this.total_due * 100) / 100;
  
}
blur_paid_today(val: number)
{
   // this.total_due = this.grand_total - (this.total_paid + val) ;
   // this.ss.invoice_model.total_due  =  Math.round(this.total_due * 100) / 100;
   // this.ss.invoice_model.total_paid_today = val;

 
}


update_change()
{
    
    this.total_pri_paid = this.total_pre_paid;

    this.total_due = this.ss.invoice_model.grand_total - this.total_pri_paid ;
  // this.total_pri_paid = this.total_pre_paid;
  // this.total_paid = this.ss.invoice_model.total_paid_today;
  // this.on_focus_total_paid();
  // this.valueChange.emit(this.grand_total);
  
 
}


 




 
}
