import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';
import { Invoice_master } from '../model/invoice_master';
import { Hb_customers } from '../model/hb_customers';
import { Hb_products } from '../model/products';
import { Expence_category } from '../model/expense_category';
import { Income_expence } from '../model/income_expence';
import { Expence_detail } from '../model/expence_detail';
import { Third_party } from '../model/third_party';
import { Invoice_slave } from '../model/invoice_slave';
import { Cash_reciept} from '../model/cash_reciept';

const publicRouter: Router = Router();


const Op = Sequelize.Op;


var numberToText = require('number2text');

 publicRouter.post('/cus_slave_report', (request: Request, response: Response) => {
 
   
      Cash_reciept.findAll({
         attributes: ['RECIEPT_NO','CASH_DATE','IS_CASH_PAY','AMOUNT_PAYED','AMOUNT_DUE','CHEQUE_NO','CHEQUE_DATE','BANK_NAME','createdAt'] ,
        where: { CASH_DATE : {[Op.between]  :  [request.body.from_date ,  request.body.to_date ]}}  
         
          

                                })
         .then(users=> 
              {
                 if(users)
                    {
                       response.send(users);

                    }

               else
                   {
                       return response.json({success:true, msg:'No records found'});
                   }
        
             })
   
   })




     
 publicRouter.post('/cus_mas_report', (request: Request, response: Response) => { 

Invoice_master.findAll({
       attributes: ['INVOICE_NUMBER','BILL_DATE','GRAND_TOTAL','SUB_TOTAL','ITEM_LENGTH'] ,
        where: { CUSTOMER_NAME:  request.body.cus_name , CUSTOMER_STREET : request.body.cus_street ,
         BILL_DATE : {[Op.between]:  [request.body.from_date ,  request.body.to_date ]}  }
                                })
                                 .then(users=> {
                 if(users)
                    {
                       response.send(users);

                    }
                    else
                    {

                      return response.json({success:true, msg:'No Items'});
                    }
                                 })

 })







  publicRouter.get('/get_reciept_number_b2b', (request: Request, response: Response) => {
    Cash_reciept.count().then(c => {
           response.json({
    text: "counted",
    count: c,
  });
              
            })
   
   })


  
   publicRouter.post('/post_cash_reciept', (request: Request, response: Response) => { 


    Cash_reciept.findOne({ where:{ RECIEPT_NO:request.body.rec_number}  }).then(person => {

     if(person){
  
                  return response.json({success:false, msg:'reciept number already existed'});
              }
  else    {
    
                        
                           if(request.body.is_cash_pay == true)
                                        {
                                          Cash_reciept.create({
                                            RECIEPT_NO :request.body.rec_number,
                                            CUS_NAME : request.body.cus_name,
                                            CUS_STREET : request.body.cus_street,
                                            CASH_DATE : request.body.cash_date,
                                            IS_CASH_PAY : true,
                                            AMOUNT_PAYED : request.body.amount_payed,
                                            AMOUNT_DUE : request.body.balance_amt
                                         
                                            
                                      
                                                   }).then(doc => { 
                                if(!doc)
                                                            {
                                                                       return response.json({success:true, msg:'db error'});
                                                            }
                                             else
                                                 {

                       Hb_customers.findOne({ where: { CUSTOMER_NAME: request.body.cus_name, STREET: request.body.cus_street } }).then(rec => {

                             if(rec)
                                  {
                                       rec.update({
                                                    OPENING_BALANCE : request.body.balance_amt,
                                                    
                                                  })
                                  } 
                                                              
                                      })
                                                    return response.json({success:true, msg:'Successfully saved'});
                                                                      
                                                }

                                                               }) 
                                                               
                                                               
                                                               
                                                               
                                        }
                                      else 
                                      {
                                        Cash_reciept.create({      
                                                                 RECIEPT_NO :request.body.rec_number,
                                                                 CUS_NAME : request.body.cus_name,
                                                                 CUS_STREET : request.body.cus_street,
                                                                 CASH_DATE : request.body.cash_date,
                                                                 AMOUNT_PAYED : request.body.amount_payed,
                                                                 AMOUNT_DUE : request.body.balance_amt,
                                                                    CHEQUE_NO : request.body.cheque_number,
                                                                    CHEQUE_DATE : request.body.cheque_Date,
                                                                    BANK_NAME: request.body.bank_name,
                                                                    IS_CASH_PAY : false
                                                                    
                                                         }).then(doc => { 
                                                                 
                                                                     if (doc)
                                                                    {


                                          Hb_customers.findOne({ where: { CUSTOMER_NAME: request.body.cus_name, STREET: request.body.cus_street } }).then(rec => {

                                                           if(rec)
                                                                             {
                                                                                  rec.update({
                                                                                               OPENING_BALANCE : request.body.balance_amt,
                                                                                               
                                                                                             })
                                                                             } 
                                                                                                         
                                                                                 })


                                                                       return response.json({success:true, msg:'Successfully saved'});
                                                                    }
                                                               })
                                                               .catch(error => response.status(400).send(error));
                                                 


                                      } 
                                    
                                }  
                                
                              })

   })  


   








  publicRouter.post('/sales_report', (request: Request, response: Response) => {
 
   
      Invoice_slave.findAll({
        where: { BILL_DATE: {[Op.between]:  [request.body.from_date ,  request.body.to_date ]}  }
                                })
         .then(users=> 
              {
                 if(users)
                    {
                       response.send(users);

                    }

               else
                   {
                       return response.json({success:true, msg:'No records found'});
                   }
        
             })
   
   })


publicRouter.post('/reports_revenue', (request: Request, response: Response) => {

Invoice_master.findAll({
        where: { BILL_DATE: {[Op.between]:  [request.body.from_date ,  request.body.to_date ]}}
               
                                }) .then(users=> 
              {
                 if(users)
                    {
                       response.send(users);

                    }

               else
                   {
                       return response.json({success:true, msg:'No records found'});
                   }


})
                              })


  publicRouter.post('/get_report_expense', (request: Request, response: Response) => {
 
   
      Income_expence.findAll({
        where: { EXP_DATE: {[Op.between]:  [request.body.from_date ,  request.body.to_date ]},
        
         EXPENCE_CATEGORY : { [Op.ne]: 'Purchase'} }
        
         
                                })
         .then(users=> 
              {
                 if(users)
                    {
                       response.send(users);

                    }

               else
                   {
                       return response.json({success:true, msg:'No records found'});
                   }
        
             })
   
   })



  publicRouter.post('/reports_purchase', (request: Request, response: Response) => {
 
   
      Income_expence.findAll({
        where: { EXP_DATE: {[Op.between]:  [request.body.from_date ,  request.body.to_date ]},
        
         EXPENCE_CATEGORY : { [Op.eq]: 'Purchase'} }
        
         
                                })
         .then(users=> 
              {
                 if(users)
                    {
                       response.send(users);

                    }

               else
                   {
                       return response.json({success:true, msg:'No records found'});
                   }
        
             })
   
   })


publicRouter.get("/stock_list", (request: Request, response: Response) => {

  Hb_products.findAll({
     attributes: ['PRODUCT_NAME','HSN_CODE','AVAIL_QTY','UNIT']
   }).
  then(users => {
    response.send(users);
    });
  
  });
  
  publicRouter.get('/list_party', (request: Request, response: Response) => {
 
   
  Third_party.findAll({ }).
then(users => {
  response.send(users);
  });

});

publicRouter.get('/list_expence_category', (request: Request, response: Response) => {
 
   
  Expence_category.findAll({
   attributes: ['CATEGORY_NAME']
 }).
then(users => {
  response.send(users);
  });

});



publicRouter.get('/get_exp_rec_no', (request: Request, response: Response) => {

  Income_expence.max('EXPENCE_ENTRY_NO').then(nom => {
  
    if(nom)
    {
        response.json({text: "counted",count: nom });
    } 
       else
       {
  
         response.json({text: "counted",count: 0});
       }
  
      })
    })




publicRouter.post('/add_other_expence_entry', (request: Request, response: Response) => {
Expence_category.findOne({ where: { CATEGORY_NAME :  request.body.Exp_catogory } }).then(person => {

  if (person)
          {
               Income_expence.create  ({   
                                        EXPENCE_ENTRY_NO: request.body.E_ENTRY_NUMBER,          
                                        EXPENCE_CATEGORY: request.body.Exp_catogory,
                                        EXP_DATE: request.body.Date,
                                        TOTAL_AMOUNT : request.body.grand_total,
                                        VENDOR : request.body.Vendor_name,                      
                                        BILL_NO : request.body.Bill_no,
                                   
                                      }).then(dd=> {
                                        if(dd)
                                        {
                                           return response.json({success:true, msg: 'Expense Saved'});
                                        }
                                        else
                                        {
                                            return response.json({success:false, msg: 'Error'});
                                        }
                                      })

          }

   else   {

             return response.json({success:false, msg: 'Category not found'});
          }       


})
})


publicRouter.post('/add_expence_entry', (request: Request, response: Response) => {
  
    
Expence_category.findOne({ where: { CATEGORY_NAME :  request.body.Exp_catogory } }).then(person => {

  if (person)
          {

         Income_expence.create  ({   
                                        EXPENCE_ENTRY_NO: request.body.E_ENTRY_NUMBER,          
                                        EXPENCE_CATEGORY: request.body.Exp_catogory,
                                        EXP_DATE: request.body.Date,
                                        TOTAL_AMOUNT : request.body.grand_total,
                                        VENDOR : request.body.Vendor_name,                      
                                        BILL_NO : request.body.Bill_no,
                                   
                                      })


                      if (request.body.items.length >= 1)
                      {   

                      var si = 1;
                      for (si; si<=request.body.items.length; si++)
                      {       

                          Expence_detail.create ({
                                                 EXPENCE_ENTRY_NO : request.body.E_ENTRY_NUMBER,
                                                 SI_NO : request.body.items[si-1].SI_NO,
                                                 PRODUCT_NAME : request.body.items[si-1].PRODUCT_NAME,
                                                 HSN_CODE : request.body.items[si-1].HSN_CODE,
                                                 QUANTITY : request.body.items[si-1].QUANTITY,
                                                 PRICE : request.body.items[si-1].PRICE,
                                                 UNIT : request.body.items[si-1].UNIT,
                                                 NET_TOTAL : request.body.items[si-1].NET_PRICE
                           

                                                })
                      
                      } 
                         let sic = 0;
                         let core = 0;
                         let pn_a = [];
                         let pn_q = [];
                      for (sic; sic<request.body.items.length;sic++)
                      {
                         pn_a[sic] = request.body.items[sic].PRODUCT_NAME;
                      }  
                       for (core; core<request.body.items.length;core++)
                      {
                         pn_q[core] = request.body.items[core].QUANTITY;
                      }  
                   
                sic = 0 ;
                core = 0 ;
                     
                    for (sic; sic<request.body.items.length;sic++)
                    {
                      Hb_products.findOne({ where: { PRODUCT_NAME:   pn_a[sic] } }).then(rec => {
                                      
                        if(rec)
                           {
                             var invo_qty = rec.AVAIL_QTY ;
                             var dp = (pn_q[core]-0) + (invo_qty-0); 
                              rec.update({AVAIL_QTY: dp}) 
                              
                               core++;
                           }

                      })
                    }      
                   

                    return response.json({success:true, msg:'Successfully saved'});
                  
                }

                else 

                {

                     return response.json({success:true, msg: 'Data Saved'});
                }      

                                 
            }

            else 

            {
                    return response.json({success:false, msg: 'Category not found'});

            }

            })

}) 



 publicRouter.post('/number_to_word', (request: Request, response: Response) => {
 

                          // var words = toWords(request.body.number_to_convert);
                       var defaultCurrency = numberToText(request.body.number_to_convert,'',true);
                         var result    =   numbered.stringify(request.body.number_to_convert);
                          return response.json({success:true, msg: defaultCurrency });
   
   })


   publicRouter.post('/add_expense_category', (request: Request, response: Response) => {
  
  
Expence_category.findOne({ where: { CATEGORY_NAME:  request.body.Category_name } }).then(person => {

  if(person){
  
                  return response.json({success:true, msg:'Category name already existed'});
            }
  
           
                           else{  
                             
                              if (request.body.is_purchase === 'Yes')
                                  
                                  {
                                    Expence_category.create({
                                        CATEGORY_NAME: request.body.Category_name
                                      
                                       
                                       
                                        })
                                  }
                                else
                                {
                                      Expence_category.create({
                                        CATEGORY_NAME: request.body.Category_name
                                                                               
                                       
                                        })

                                }

                                      return response.json({success:true, msg:'Successfully saved'});
    
                                 }
            }) 

      
  
  

})



   publicRouter.post('/update_product', (request: Request, response: Response) => {
  
  
    Hb_products.update({                                         
                                       HSN_CODE: request.body.hsn_code,
                                       AVAIL_QTY : request.body.avail_qty,
                                       UNIT : request.body.unit,
                                       PRICE : request.body.price
                                            
         
                                        } , { 
                              where: { PRODUCT_NAME:  request.body.product_name } })
                   
      
          return response.json({success:true, msg:'Successfully updated'});
        
    
    })
    

   publicRouter.get('/get_product_list', (request: Request, response: Response) => {
 
   
    Hb_products.findAll({
    
   }).
  then(users => {
    response.send(users);
    });
  
  });
  

publicRouter.get('/get_invoice_list_b2b', (request, response) => {
  Invoice_master.findAll({
      where: {
         IS_B2B: true
      }
  }).
      then(users => {
      response.send(users);
  });
});

publicRouter.get('/get_invoice_list_b2c', (request, response) => {
  Invoice_master.findAll({
      where: {
         IS_B2B: true
      }
  }).
      then(users => {
      response.send(users);
  });
});















publicRouter.get('/get_customers_list_b2b', (request: Request, response: Response) => {
 
   
  Hb_customers.findAll({

    where: {  GSTIN: { [Op.ne]: ''} }
  
 }).
then(users => {
  response.send(users);
  });

});

 publicRouter.get('/get_products_list', (request: Request, response: Response) => {
 
   
  Hb_products.findAll({
  
 }).
then(users => {
  response.send(users);
  });

});




  

                        
   
   



   publicRouter.get('/get_invoice_number_b2b', (request: Request, response: Response) => {

    Invoice_master.max('INVOICE_NUMBER', {where : {'IS_B2B': true } }).then(result => {

     if(result)
     {
                response.json({text: "counted",count: result });

     }

     else
     {

       response.json({text: "counted",count: 0});
     }


    })
  })
   
   



  
   publicRouter.post('/delete_customer', (request: Request, response: Response) => { 

    Hb_customers.findOne({ where: { CUSTOMER_NAME:  request.body.customer_name , GSTIN : request.body.gstin } }).then(person => {

  if(person){
                  Hb_customers.destroy({
      
                             where: {
                                    CUSTOMER_NAME:  request.body.customer_name,
                                    GSTIN: request.body.gstin
                                    }
                                       
                  
                         }).then(res=> {

                           if(res)
                           {
                               return response.json({success:true, msg:'Successfully deleted'});
                           }
                         })
            }
     
    else

     {
        return response.json({success:true, msg:'No Item to be Deleted'});
     }
                        
 }) })





 publicRouter.post('/update_customer', (request: Request, response: Response) => { 

  
 Hb_customers.update({
                                        STREET: request.body.street,
                                        CITY: request.body.city,
                                        GSTIN: request.body.gstin,
                                        PHONE: request.body.ph1,
                                        PHONE2: request.body.ph2,
                                        OPENING_BALANCE: request.body.opbal,
                                        LAST_PAYED_INVO_NUM: request.body.last_invo_num

         
                  
                  } , {  where: { CUSTOMER_NAME:  request.body.customer_name, GSTIN:request.body.gstin } 
                  
                                  
                  
                         })

                          return response.json({success:true, msg:'Successfully updated'});
 }) 



   publicRouter.get('/get_customer_b2b_all', (request: Request, response: Response) => {
 
   
  Hb_customers.findAll({

    where: {  GSTIN: { [Op.ne]: ''} }
  
 }).
then(users => {
  response.send(users);
  });

});

 publicRouter.get('/get_customer_list_b2b', (request: Request, response: Response) => {
 
   
  Hb_customers.findAll({
    where: {  GSTIN: { [Op.ne]: ''} }
   }).
then(users => {
  response.send(users);
  });

});

  publicRouter.get('/get_customer_b2c_all', (request: Request, response: Response) => {
   Hb_customers.findAll({
    where: {  GSTIN: { [Op.eq]: ''} }
   }).
    then(users => {
    response.send(users);
  });
});

  publicRouter.get('/get_customer_all', (request: Request, response: Response) => {
   Hb_customers.findAll({
   
   }).
    then(users => {
    response.send(users);
  });
});


publicRouter.post('/add_customer', (request: Request, response: Response) => {
  
  
Hb_customers.findOne({ where: { CUSTOMER_NAME:  request.body.customer_name , GSTIN : request.body.gst } }).then(person => {

  if(person){
  
                  return response.json({success:false, msg:'Name already existed'});
            }
            
                           else{
                                    Hb_customers.create({

                                        CUSTOMER_NAME: request.body.customer_name,
                                        STREET: request.body.street,
                                        CITY: request.body.city,
                                        GSTIN: request.body.gst,
                                        PHONE: request.body.ph_no,
                                        MOBILE: request.body.ph_no2,
                                        OPENING_BALANCE: request.body.Opening_bal,
                                        LAST_PAYED_INVO_NUM : request.body.last_invo_num
                                                                              
                                      }).then(function(doc,err) {
                                           if(!err)
                                           {
                                              return response.json({success:true, msg:'Successfully saved'});
                                           }
                                           else
                                           {
                                             return response.json({success:false, msg:err});
                                           }

                                      })
         
    
                                 }
            }) 


})
 
                

publicRouter.get("/simple", (request: Request, response: Response) => {

  return response.json({
    text: "Hello Angular 2",
    title: "Greetings.",
  });
});

export { publicRouter };
