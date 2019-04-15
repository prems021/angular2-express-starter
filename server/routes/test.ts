import { Request, Response, Router } from "express";


import { Sequelize, sequelize } from './dbcon';



const testRouter: Router = Router();



// testRouter.post("/update", (request: Request, response: Response) => {
  
 
 
// Tas_test.findOne({ where: { ITEM_NAME:  request.body.item_name } }).then(person => {

//   if(person){
  
//                  person.update({ ITEM_COUNT  : person.ITEM_COUNT + 8 })
//                 return response.json({  msg: "Table undu"  });
//             }
  
//   else 
//         {
//              return response.json({  msg: "Table illa"  });

               
//         }

  

    
      
    
//       })
  
//       })






testRouter.get("/all", (request: Request, response: Response) => {
  
 

 response.json('ji');
  
 
 

  })





export { testRouter };       



