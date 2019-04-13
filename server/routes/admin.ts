import { Request, Response, Router } from "express";
import { Admin_users } from '../model/admin_users';
const adminRouter: Router = Router();


adminRouter.get("/cdb_1", (request: Request, response: Response) => {
  
   Admin_users.sync({force: true}).then(() => {
   //Table created
  return Admin_users.create({
       
     USER_NAME: ''
        
    
    })
   })

 return response.json({success:true, msg: 'CREATED'});
     
     })
 
 adminRouter.post('/login', (request: Request, response: Response) => {
   var username = request.body.username;
   var password = request.body.password;
    
    Admin_users.findOne({
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
