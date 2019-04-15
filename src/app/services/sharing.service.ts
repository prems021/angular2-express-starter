import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { invoice } from './model';


import 'rxjs/add/operator/map'

@Injectable()
export class SharingService {
date_change_flag : number = 0;
is_del_possibe : boolean = false;
invoice_model = new invoice(0,0,[],[],'','','','','','','','','',0,0,0,0,0,0,true,false,21,0,new Date(),0) ;
  
    constructor(private http: Http) { }

  
  


}