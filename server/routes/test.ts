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
  
 


  
 
 
  

  //      Tas_test.sync({force: true}).then(() => {
  //  //Table created
  // return Tas_test.create({
    
  //    ITEM_NAME : 'a',
   
    
      
    
  //    })
  //     .then(users => { response.json({  msg: "Table created"  });

  //     })
  
     

  //     })
  })





export { testRouter };       



