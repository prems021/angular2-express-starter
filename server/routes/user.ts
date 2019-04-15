import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';
import { Hb_users } from '../models/users';
import { Super_admin } from '../models/super_admin';
const userRouter: Router = Router();

userRouter.get("/", (request: Request, response: Response) => {

  response.json('ji');
});


 userRouter.post('/login_check', (request: Request, response: Response) => {
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
                                  Super_admin.findOne({ where: { ADMIN_NAME : 'premji'}})
                                                    .then(resu => {

                                                      if (resu.DEMO_CLICKS < 0)
                                                      {
                                                         return response.json({success:false, msg:'Licence Expired Contact 7012406551'});
                                                      }

                                                      else
                                                      {

                                                         resu.update({ DEMO_CLICKS  : resu.DEMO_CLICKS - 1 })

                                                           Hb_users.findOne({
                                                                               where: {
                                                                                         USER_NAME: username,
                                                                                           
                                                                                       }
                                                                                     }).then(check => { 
                                                                                           if( check.IS_ADMIN === true)
                                                                                           {
                                                                                             return response.json({success:true, msg:'Admin logged'});
                                                                                           }

                                                                                           else
                                                                                           {
                                                                                             return response.json({success:true, msg:'user logged'});
                                                                                           }

                                                                                     })
                                                         

                                                      } 
                                                    })

                            }

                            else
                            {
                               return response.json({success: false, msg: 'Authentication failed'});
                            }
                            })

                            })                        

                                                    




                                               



  userRouter.post('/server_check', (request: Request, response: Response) => {
   var username = 'a'
   var password = 's'
   
    Hb_users.findOne({
  where: {
    USER_NAME: username,
    PASSWORD: password,
   
    }
}).then(function(result){
  
                                                if(result)
                                                { 
                                                    if(result.IS_ADMIN === true)
                                                    {
                                                        return response.json({ msg:'server running'});
                                                       }
                                                          else
                                                {
                                                     return response.json({ msg:'waiting'});   }

                                                }   
                                                else
                                                {

                                                response.status(403).send({msg: 'failed'});
                                                }    
                         });
      
   
 

   
 });
export { userRouter };