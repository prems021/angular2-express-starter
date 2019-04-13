import { Request, Response, Router } from "express";

const adminRouter: Router = Router();


adminRouter.get("/", (request: Request, response: Response) => {

  response.json('hi');
});



 userRouter.post('/login', (request: Request, response: Response) => {
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

                                                    


export { adminRouter };
