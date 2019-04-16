import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';

import { Super_admin } from '../model/super_admin';
import { Hb_users } from '../model/users';
import { Invoice_master } from '../model/invoice_master';
import { Hb_customers } from '../model/hb_customers';
import { Hb_products } from '../model/products';

import { Invoice_slave } from '../model/invoice_slave';
import { Expence_category } from '../model/expense_category';
import  { Income_expence } from '../model/income_expence';
import { Third_party } from '../model/third_party';
import { Cash_reciept} from '../model/cash_reciept';

const adminRouter: Router = Router();



  adminRouter.get("/cash_reciept", (request: Request, response: Response) => {
  
   Cash_reciept.sync({force: true}).then(() => {
   //Table created
  return Cash_reciept.create({
       
     RECIEPT_NO: 0
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })


adminRouter.get("/third_party", (request: Request, response: Response) => {
  
   Third_party.sync({force: true}).then(() => {
   //Table created
  return Third_party.create({
       
     PARTY_NAME: 'sam'
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })



adminRouter.get("/Expence_detail", (request: Request, response: Response) => {
  
   Expence_detail.sync({force: true}).then(() => {
   //Table created
  return Expence_detail.create({
       
     EXPENCE_ENTRY_NO: 0
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })


adminRouter.get("/Income_expence", (request: Request, response: Response) => {
  
   Income_expence.sync({force: true}).then(() => {
   //Table created
  return Income_expence.create({
       
     EXPENCE_ENTRY_NO: 0
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })


adminRouter.get("/Expence_category", (request: Request, response: Response) => {
  
   Expence_category.sync({force: true}).then(() => {
   //Table created
  return Expence_category.create({
       
     CATEGORY_NAME: 'Purchase'
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })

adminRouter.get("/invoice_slave", (request: Request, response: Response) => {
  
   Invoice_slave.sync({force: true}).then(() => {
   //Table created
  return Invoice_slave.create({
       
     MASTER_ID: 1
        
    
    })
   })
 return response.json({success:true, msg: 'CREATED'});
     
     })











adminRouter.get("/product_table", (request: Request, response: Response) => {
  
   Hb_products.sync({force: true}).then(() => {
   //Table created
  return Hb_products.create({
    
    
     PRODUCT_NAME: 'kim'
        
    
    })
   })
 return response.json({success:true, msg: 'CREATED'});
      
     })


adminRouter.get("/cus_table", (request: Request, response: Response) => {
  
   Hb_customers.sync({force: true}).then(() => {
   //Table created
  return Hb_customers.create({
       
     CUSTOMER_NAME: 'kim'
         
    })
   })
 return response.json({success:true, msg: 'CREATED'});
     
     })



adminRouter.get("/invo_master", (request: Request, response: Response) => {
  
   Invoice_master.sync({force: true}).then(() => {
   //Table created
  return Invoice_master.create({
       
     INVOICE_NUMBER: 1
     
    
    })
   })
 return response.json({success:true, msg: 'CREATED'});
     
     })


adminRouter.get("/user", (request: Request, response: Response) => {
  
   Hb_users.sync({force: true}).then(() => {
   //Table created
  return Hb_users.create({
    
    
     USER_NAME: 'premji'
     
    
    
    
    })
   })
 return response.json({success:true, msg: 'CREATED'});
  
    
     })
     
     adminRouter.get("/s_a", (request: Request, response: Response) => {
  
   Super_admin.sync({force: true}).then(() => {
   //Table created
  return Super_admin.create({
    
    
     ADMIN_NAME: 'premji'
     
    
    
    
    })
   })
 return response.json({success:true, msg: 'CREATED'});
  
    
     })
     
  
                                                    


export { adminRouter };
