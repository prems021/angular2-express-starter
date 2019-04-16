import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from './headers' ;
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

    total = 0;
    
  

    
    constructor(private http: Http) { }


    get_customers_subs_list()
    {
      return this.http.get('/api/public/get_subscription_list',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_cus_slave_report(model:any)
    {
     
       let body= JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/cus_slave_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
   
   get_master_cus_report(model:any)
   {
      let body= JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/cus_mas_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
   }
   
   get_reciept_number_b2b()
    {
      return this.http.get('/api/public/get_reciept_number_b2b',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }


    post_cash_reciept(model:any)
    {
       let body= JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/post_cash_reciept',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
    
     get_sales_report(model : any)
 {

     let body= JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/sales_report',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
 } 

 get_report_expense(model: any)
  {

     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/get_report_expense',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }     

 get_report_purchase(model: any)
  {

     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/reports_purchase',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }  


    get_report_revenue(model: any)
  {

     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/reports_revenue',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }  
  
   
  save_other_expense(model:any)
  {
     let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/add_other_expence_entry',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

  }


    get_exp_type_list()
    {
            return this.http.get('/api/public/list_expence_category',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }


   get_party_list()
   {
      return this.http.get('/api/public/list_party',{headers : contentHeaders})  
      .map((res: Response) => res.json())
   }

    get_exp_rec_no()
     {
      return this.http.get('/api/public/get_exp_rec_no',{headers : contentHeaders})  
      .map((res: Response) => res.json())
     }

     add_expence_entry(model : any)
     {

    let body = JSON.stringify(model); 
       console.log('body',body);
      return this.http.post('/api/public/add_expence_entry',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())

      }   


    add_expense_category(model:any)
    {
      let body = JSON.stringify(model); 
      return this.http.post('/api/public/add_expense_category',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    delete_customer(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/delete_customer',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    update_customer(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/update_customer',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_customer_list_all()
    {
        return this.http.get('/api/public/get_customer_list_all',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
      get_customer_list_b2b()
    {
        return this.http.get('/api/public/get_customer_list_b2b',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    add_customer(model:any)
    {
         let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/add_customer',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    update_invoice_b2b(model:any)
    {
          let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/post/update_invoice_b2b',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
        update_invoice_b2c(model:any)
    {
          let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/post/update_invoice_b2c',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

      get_invoices_b2b()
    {
      return this.http.get('/api/public/get_invoice_list_b2b',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
    get_invoices_b2c()
     {
      return this.http.get('/api/public/get_invoice_list_b2c',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    add_product(model:any)
    {
       let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/post/add_product',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    update_product(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/update_product',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
   get_product_list()
   {
     
      return this.http.get('/api/public/get_product_list',{headers : contentHeaders})  
     .map((res: Response) => res.json())

   }

    get_active_taxes_only()
    {
      return this.http.get('/api/public/get_active_taxes_only',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_active_taxes_on_edit(model:any)
    {
       let body = JSON.stringify(model); 
      return this.http.post('/api/public/get_active_taxes_on_edit',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    disable_tax_cat(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/disable_tax_cat',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    enable_tax_cat(model:any)
    {
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/enable_tax_cat',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_tax_cat()
    {
      return this.http.get('/api/public/get_tax_cat',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    add_tax_cat(model:any)
    {
      
      let body = JSON.stringify(model); 
      console.log('body',body);
      return this.http.post('/api/public/add_tax_cat',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }

    get_greetings()
    {
      return this.http.get('/api/public/get_greetings',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }
   
   add_new_greeting(model:any)
   {
     let body= JSON.stringify(model); 
      return this.http.post('/api/post/add_new_greeting', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
   }
   update_default_greeting(model:any)
   {
     let body= JSON.stringify(model); 
                 console.log('bodies',body);
      return this.http.post('/api/post/update_default_greeting', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
   }


       post_invoice_b2b(model:any) 
       {
        let body= JSON.stringify(model); 
                 console.log('body',body);
      return this.http.post('/api/post/post_invoice_b2b', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
            
        } 

   get_figure(model:any)
  {
    
       let body = JSON.stringify(model); 
        return this.http.post('/api/public/number_to_word',body,{headers : contentHeaders})  
      .map((res: Response) => res.json())
  }

   get_invo_number_b2b()
    {
         return this.http.get('/api/public/get_invoice_number_b2b',{headers : contentHeaders})  
         .map((res: Response) => res.json())
    }

    
    get_products_list()
    {
       return this.http.get('/api/public/get_products_list',{headers : contentHeaders})  
      .map((res: Response) => res.json())
    }
 
 


   get_customers_list_b2b()
   {
     return this.http.get('/api/public/get_customers_list_b2b',{headers : contentHeaders})  
      .map((res: Response) => res.json())
   }

    adduser(model:any) {

        let body= JSON.stringify(model); 

        
        return this.http.post('/api/public/add_user', body, { headers: contentHeaders})
            .map((response: Response) => {
                
                
                {
                    let postr = response.json();
                   console.log('responce=',postr)
                    
                }
            })   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
            
                    }


  
 
 


    private handleError(error: any): Promise<any> 
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
