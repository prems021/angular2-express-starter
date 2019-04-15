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


adminRouter.get("/cdb_1", (request: Request, response: Response) => {
  
   Hb_users.sync({force: true}).then(() => {
   //Table created
  return Hb_users.create({
       
     USER_NAME: ''
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })
 
adminRouter.get("/cdb_2", (request: Request, response: Response) => {
  
   Hb_customers.sync({force: true}).then(() => {
   //Table created
  return Hb_customers.create({
       
     CUSTOMER_NAME: ''
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })


  
                                                    


export { adminRouter };
