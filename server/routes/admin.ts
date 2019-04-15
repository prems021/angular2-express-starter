import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';

import { Super_admin } from '../models/super_admin';
import { Hb_users } from '../models/users';
import { Invoice_master } from '../models/invoice_master';
import { Hb_customers } from '../models/hb_customers';
import { Hb_products } from '../models/products';

import { Invoice_slave } from '../models/invoice_slave';
import { Expence_category } from '../models/expense_category';
import  { Income_expence } from '../models/income_expence';
import { Third_party } from '../models/third_party';
import { Cash_reciept} from '../models/cash_reciept';

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
