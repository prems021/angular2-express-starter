import { Component, OnInit, Input, OnChanges,SimpleChanges, ViewChild, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';
import { DataService } from '../../services/data.service';
import { UpdateService } from'../../services/update.service';
import { tax_master } from './model';
import { post_model } from './model';


@Component({
  selector: 'app-bill-sub-total-section-edit',
  templateUrl: './sub_total_on_edit.html',
  styleUrls: ['./sub_total_on_edit.css']
})
export class Sub_total_edit_Component implements OnChanges {

  @Input() sub_total : number;
  master_tax = new tax_master(0,[]);
  mode = new post_model(0,'');
  j : number = 0;
  z : number = 0;
  grand_total = 0;
  total_tax : number = 0;
  @Output() valueChange = new EventEmitter();
 
  

  
     constructor(private router: Router ,private us : UpdateService, private ss : SharingService , private ds : DataService) { }
  
 ngOnInit() {
                 this.clear_stack();
                 this.mode.invo_number = this.us.get_invoice_number_b2b();
                 this.get_invo_num();
                //  this.get_active_taxes_on_edit();
        

               
            }

  

  ngOnChanges(changes: SimpleChanges) {
    this.update_change();
  }

get_invo_num()
{
  
  console.log('invo_mode',this.mode);
}
clear_stack()
{
  console.log('ins',this.ss.invoice_model.taxes.length)
  for(this.z=0; this.z<=this.ss.invoice_model.taxes.length;this.z++)
  {
     console.log('inside',this.z);

    this.ss.invoice_model.taxes.pop();
    // this.master_tax.details.pop();
  }
}


get_active_taxes_on_edit()
{
  this.ds.get_active_taxes_on_edit(this.mode).subscribe((jsonData) => { this.get_active_taxes_on_edit_res(jsonData)  
    },(err) => console.error(err),);
}

get_active_taxes_on_edit_res(json:any)
{
   
   console.log('taxxx',json)

  this.master_tax.active_count = json.length;
 for(this.j=0;this.j<json.length;this.j++)
  {
    
     this.tax_push();
     this.push_tax_det()
     this.master_tax.details[this.j].ID = this.j + 1;
     this.master_tax.details[this.j].TAX_NAME = json[this.j].TAX_NAME;
     this.master_tax.details[this.j].TAX_RATE = json[this.j].TAX_PER;
   
  }


}

update_change()
{
  this.grand_total = this.sub_total;
  this.total_tax = 0 ;
    for(this.j=0;this.j<this.master_tax.active_count;this.j++)
  {    
    
      this.ss.invoice_model.taxes[this.j].SI_NO = this.j;
     this.ss.invoice_model.taxes[this.j].TAX_NAME = this.master_tax.details[this.j].TAX_NAME;
     this.ss.invoice_model.taxes[this.j].TAX_PER =  this.master_tax.details[this.j].TAX_RATE ;
    this.master_tax.details[this.j].TAX_AMT = (this.sub_total * this.master_tax.details[this.j].TAX_RATE )/100 ;
    this.master_tax.details[this.j].TAX_AMT =  Math.round(this.master_tax.details[this.j].TAX_AMT * 100) / 100;
    this.ss.invoice_model.taxes[this.j].TAX_AMT = this.master_tax.details[this.j].TAX_AMT;
    this.grand_total = this.grand_total + this.master_tax.details[this.j].TAX_AMT;
    this.total_tax = this.total_tax + this.master_tax.details[this.j].TAX_AMT;
  }
  this.grand_total = Math.round(this.grand_total * 100) / 100;
  this.ss.invoice_model.grand_total = this.grand_total;
  this.total_tax =  Math.round(this.total_tax * 100) / 100;
  this.ss.invoice_model.total_tax = this.total_tax;
  this.valueChange.emit(this.grand_total);
}

tax_push()
{   
  this.master_tax.details.push({"ID":0,"IS_ACTIVE":true,"TAX_NAME":'',"TAX_RATE":0,"TAX_AMT":0})
}

push_tax_det()
{
  this.ss.invoice_model.taxes.push({"SI_NO":1,"TAX_NAME":"","TAX_PER":0,"TAX_AMT":0})
}
 




 
}
