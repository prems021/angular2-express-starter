import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';
import { Hb_users  } from '../model/admin_user';
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
 
 adminRouter.post('/login', (request: Request, response: Response) => {
   var username = request.body.username;
   var password = request.body.password;
    
    Hb_users.findOne({
  where: {
    USER_NAME: request.body.username,
    PASSWORD: request.body.password
    }
}).then(person => {
  
                       if(person)
                           { 
                                  return response.json({success:true, msg:'Admin logged'});
                            }
                        else
                        {
                          return response.json({success:true, msg:'user logged'});
                         }
              })

                            })

                                                    


export { adminRouter };
