import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';
import { Hb_products } from '../model/products';
import { Invoice_master } from '../model/invoice_master';
import { Invoice_slave } from '../model/invoice_slave';
import { Tax_detail } from '../model/tax_details';
import { Hb_customers } from '../model/hb_customers';

const postRouter: Router = Router();

var series = require('run-series')


postRouter.post('/update_invoice_b2b', (request: Request, response: Response) => {

  Invoice_master.findOne({ where: {INVOICE_NUMBER: request.body.INVOICE_NUMBER,IS_B2B:true }}).then(prsn => {
  var cur_price = prsn.GRAND_TOTAL
  var cus_name = prsn.CUSTOMER_NAME
  var gstin = prsn.CUSTOMER_GST_IN

    if(cur_price < request.body.grand_total)
  {
       var difee =  (request.body.grand_total - 0) - (cur_price-0)

       Hb_customers.findOne({ where: {CUSTOMER_NAME: cus_name,GSTIN:gstin  }}).then(pron => {

            var op_bal = pron.OPENING_BALANCE
            var sum = (op_bal-0) + (difee-0)
             pron.update({
                              OPENING_BALANCE : sum
                         })

        })
  }



  if(cur_price > request.body.grand_total)
  {
       var difee =  (request.body.grand_total - 0) - (cur_price-0)

       Hb_customers.findOne({ where: {CUSTOMER_NAME: cus_name,GSTIN:gstin  }}).then(pron => {

            var op_bal = pron.OPENING_BALANCE
            var sum = (op_bal-0) + (difee-0)
             pron.update({
                              OPENING_BALANCE : sum
                         })

        })
  }
 
  
})



let pn_a = [];
let pq_a = [];
let diffss = [];
let a_c = 0;

Invoice_slave.findAll ({ where: { MASTER_ID:  request.body.INVOICE_NUMBER
                  ,IS_B2B:true } }).then(rep => { 
                      for(a_c = 0; a_c < request.body.length ; a_c ++)
                       {
                         pn_a[a_c] = rep[a_c].PRODUCT_NAME
                         pq_a[a_c] = rep[a_c].QUANTITY
                       }
                  } ).then(x => {  console.log(pn_a);        
               
                for(let loo = 0 ; loo < request.body.length;loo ++)
                {                 
                  if(request.body.items[loo].PRODUCT_NAME === pn_a[loo] )
                  {                                         
                    if ( pq_a[loo] != request.body.items[loo].QTY )

                      {             
                                        
                           diffss[loo] = pq_a[loo] - request.body.items[loo].QTY
                          
                           Hb_products.findOne({ where: {PRODUCT_NAME: pn_a[loo] }}).then(pn => {

                            
                                var cur_qty = pn.AVAIL_QTY + diffss[loo]
                               
                                pn.update({  AVAIL_QTY : cur_qty  })
                             })
                      }

                      else { }                    
              
                  }
                  else
                  {  var new_item  = request.body.items[loo].PRODUCT_NAME
                    Hb_products.findOne({ where: {PRODUCT_NAME: new_item }}).then(pn => {
                         var cur_qty = pn.AVAIL_QTY
                                   var upda_qty = cur_qty - request.body.items[loo].QTY ;
                                   console.log('prem........upda_qty',upda_qty)
                                 pn.update({  AVAIL_QTY : upda_qty  })                        
                     }).then(yy=> {
                      Hb_products.findOne({ where: {PRODUCT_NAME: pn_a[loo] }}).then(pns => { 
                                         var cur_qtys = pns.AVAIL_QTY
                                         var upda_qtys = cur_qtys + pq_a[loo]                                          
                                         pns.update({  AVAIL_QTY : upda_qtys  })
                                      })

                     }) }
               
                } })      
    

                Invoice_master.findOne({ where: { INVOICE_NUMBER:  request.body.INVOICE_NUMBER , IS_B2B : true }}).then(res => {
              if (res)
                  {  
                      let old_length = res.ITEM_LENGTH  
                   for(var loop = request.body.length + 1  ; loop <= old_length; loop ++ )
                  {

                    Invoice_slave.update({ 
                                     SI_NO : 999
                               } , {
                             where: { MASTER_ID:  request.body.INVOICE_NUMBER ,IS_B2B:true, SI_NO :loop } })

                  
                             
                          
                           Invoice_slave.findOne({ where: {MASTER_ID:  request.body.INVOICE_NUMBER , IS_B2B : true , SI_NO:loop } }).then(del => {
                          if(del){
                             
                            var diff = del.QUANTITY
                            Hb_products.findOne({ where: {PRODUCT_NAME: del.PRODUCT_NAME }}).then(pn => {
                                   var cur_qty = pn.AVAIL_QTY
                                  var upda_qty = cur_qty + del.QUANTITY;
                                
                              pn.update({  AVAIL_QTY : upda_qty  }).then(x=>{

                                if(x) {

                                Invoice_slave.destroy({  where: { MASTER_ID:  request.body.INVOICE_NUMBER ,IS_B2B:true, SI_NO : 999  }}) }
                                else { }
                               })


                                 }) }  else { } })
                            }


            } } )

                       
            
            Invoice_master.update({

              CUSTOMER_CITY : request.body.cus_city,
              CUSTOMER_STREET : request.body.cus_street,
              TRANS_MODE : request.body.tran_mode,
              VEH_NO : request.body.veh_no,
              PLACE_SUPPLY : request.body.place_of_supply,
              BUNDLES : request.body.no_bundles,
              SUB_TOTAL      : request.body.sub_total,
              TAX_COLLECTED      : request.body.total_tax,
              GRAND_TOTAL    : request.body.grand_total,
              ITEM_LENGTH    :request.body.length,
              BILL_DATE : request.body.invoice_date,
              TOTAL_PAYED   :  (request.body.total_paid_today-0) + (request.body.total_pre_paid-0),
              TOTAL_DUE    :request.body.total_due,
              IS_PARTIAL_PAY : request.body.is_partial_pay
                       
                       } , { 
                               where: { INVOICE_NUMBER:  request.body.INVOICE_NUMBER, IS_B2B : true } })
     
        
     
     for ( var inde4 = 0; inde4 < request.body.length ; inde4++ )
     {
        Invoice_slave.update({ 
                                  
                               
                                 PRODUCT_NAME : request.body.items[inde4].PRODUCT_NAME,
                                 HSN_CODE : request.body.items[inde4].HSN_CODE,
                                  
                                  UNIT : request.body.items[inde4].UNIT,
                                  QUANTITY: request.body.items[inde4].QTY,
                                  PRICE: request.body.items[inde4].PRICE,
                                 
                                   
                             } , {
                                   where: { MASTER_ID:  request.body.INVOICE_NUMBER ,IS_B2B:true, SI_NO : request.body.items[inde4].SI_NO } }) 
     
     }   
     


     return response.json({success:true, msg:'Invoice Saved Sucessfully'});
             



})

postRouter.post('/get_a_invoice_b2b', (request: Request, response: Response) => {
 
   
   Invoice_master.findOne({
                            where: {
                                      INVOICE_NUMBER: request.body.Invo_number , IS_B2B : true
                                  }
                       }).then(function(master){
  
                                                if(master)
                                                  
                                                  {

                                                      Invoice_slave.findAll({
                                                      
                                                      where: {
                                                           MASTER_ID: request.body.Invo_number , IS_B2B : true 
                                                             }  }).then(function(slave)  {                    
                                                                                            response.json({
                                                                                            master: master, slave: slave
                                                                                            });

                                                                                           });  }
                                                                                           
                                                   else
                                                   {

                                                      response.status(403).send({success: false, msg: 'Bill not found'});
                                                   }                                        
                                                                                           
                                                                                           
                                                  }); 

});





postRouter.post('/post_invoice_b2b', (request: Request, response: Response) => {

Invoice_master.findOne({
    where: { INVOICE_NUMBER: request.body.INVOICE_NUMBER, IS_B2B : true  } }).then(res => {

    if(res)
     {
         return response.json({success:false, msg:'Invoice Already Existed'});
     }
     else
     {
       
        save_master(request,response)   
               
     }


    })
    
 })

function save_master(reqe,respo)
{
     Invoice_master.create({

             INVOICE_NUMBER:reqe.body.INVOICE_NUMBER,
             CUSTOMER_NAME:reqe.body.cus_name,
             CUSTOMER_CITY:reqe.body.cus_city,
             CUSTOMER_STREET:reqe.body.cus_street,
             CUSTOMER_GST_IN:reqe.body.cus_gst,
             CUSTOMER_PHONE:reqe.body.cus_phone,
             CUSTOMER_MOBILE:reqe.body.cus_mobile,
             PAN_NO : reqe.body.pan_no,
             PLACE_SUPPLY:reqe.body.place_of_supply,
             BUNDLES:reqe.body.no_bundles,
             BILL_DATE:reqe.body.invoice_date,
             SUB_TOTAL:reqe.body.sub_total,
             TAX_COLLECTED:reqe.body.total_tax,
             GRAND_TOTAL:reqe.body.grand_total,
             ITEM_LENGTH:reqe.body.length,
             TOTAL_PAYED:reqe.body.total_paid_today,
             TOTAL_DUE:reqe.body.total_due,
             IS_PARTIAL_PAY:reqe.body.is_partial_pay,
             IS_B2B:reqe.body.is_b2b
         }).then(function(docd,err) {
             if(!err)
             {
                save_slave_on_loop(reqe,respo)
                
             }
             else
             {
                return respo.json({success:false, msg:err});
             }

         })
}
    

function save_slave_on_loop(req,res)
{
 for (let iit = 0; iit < req.body.length;iit ++)
 {
   Invoice_slave.create({

       MASTER_ID: req.body.INVOICE_NUMBER,
       SI_NO: req.body.items[iit].SI_NO,
       PRODUCT_NAME: req.body.items[iit].PRODUCT_NAME,
       HSN_CODE: req.body.items[iit].HSN_CODE,
       QUANTITY: req.body.items[iit].QTY,
       PRICE: req.body.items[iit].PRICE,
       NET_TOTAL: req.body.items[iit].NET_PRICE,
       UNIT : req.body.items[iit].UNIT,
       IS_B2B : req.body.is_b2b,
       BILL_DATE: req.body.invoice_date
   }).then(function(doc,err){

       if(!err)
       {
           
          
          
       } 
       else
       {
        return res.json({success:false, msg:err});
       }

   })
 }
   deduct_stock(req,res)
   adjust_opening_bal(req,res)
  
   
}
function adjust_opening_bal(re,rp)
{
       Hb_customers.findOne({ where: { CUSTOMER_NAME:  re.body.cus_name , GSTIN : re.body.cus_gst } }).then(tasc => {

                                        if(tasc)
                                        {
                                          var due = tasc.OPENING_BALANCE;
                                          var diff = due + re.body.total_due
                                          tasc.update({
                                                         OPENING_BALANCE : diff

                                                      })
                                        } } )
}



function deduct_stock(re,rp)
{

  
     for (let in2 = 0; in2 < re.body.length; in2++)  
           {


            

              Hb_products.findOne({ where: { PRODUCT_NAME:re.body.items[in2].PRODUCT_NAME } }).then(rec => {
                                      
                         if(rec)

                             {
                                var invo_qty = rec.AVAIL_QTY ;
                                var coming_qty = re.body.items[in2].QTY;
                                if ( coming_qty > 0 )
                                {
                                  invo_qty = invo_qty - coming_qty
                                  rec.update({AVAIL_QTY: invo_qty}).then(function(doc,err)
                                  {
                                      if(!err)
                                      {
                                        
                                      }
                                      else
                                      {
                                        return rp.json({success:false, msg:err});
                                      }

                                  })
                                }
                                
                             }  })

             }   
             return rp.json({success:true, msg:'Invoice Saved Sucessfully'});
            
}





postRouter.post('/add_product', (request: Request, response: Response) => {

  Hb_products.findOne({
    where: { PRODUCT_NAME: request.body.product_name  }
  }).then(res => {
    if (res)
    {
    
        return response.json({success:false, msg:'Product Already Existed'});
   
    }
       
    else
    {
     Hb_products.create({

            PRODUCT_NAME:request.body.product_name,
            HSN_CODE: request.body.hsn_code,
            PRICE:request.body.price,
            AVAIL_QTY:request.body.opening_stock,
            UNIT:request.body.unit

     }).then(resq => {

     	if (resq)
     	{
     		return response.json({success:true, msg:'Product Added'});
     	}
     })
    }
    

})
})




export { postRouter };       



// postRouter.post('/update_invoice_b2b', (request: Request, response: Response) => {

//   Invoice_master.findOne({
//     where: { INVOICE_NUMBER: request.body.INVOICE_NUMBER, IS_B2B : true  } }).then(result => {

//     if(result)
//      {
//       series([
//         function add_to_stock_from_slave(callback) {
//                   var len = result.ITEM_LENGTH;
//                    for( let sli = 1; sli <= len ; sli++ )
//                     {
//                       Invoice_slave.findOne({ where: { MASTER_ID:request.body.INVOICE_NUMBER , SI_NO : sli  } }).then(rt => {
//                        if(rt)
//                          {
//                            let fetched = rt.QUANTITY;
//                            console.log('fetched..............',fetched);
         
//                              Hb_products.findOne({ where: { PRODUCT_NAME:rt.PRODUCT_NAME } }).then(rec => {
//                                 if(rec)
//                                    {          
//                                         var oq = rec.AVAIL_QTY;
//                                         console.log('avail qty.............',oq);
             
//                                         var nq = (oq-0) + (fetched - 0);
//                                         console.log('addded.............',nq);

//                                                      rec.update({
//                                                                    AVAIL_QTY : nq
//                                                                }).then(function(doc,err)
//                                                                { 
//                                                                 if(!err)
//                                                                 {
                                                                
//                                                                 }
//                                                                 else
//                                                                 {
 
//                                                                 } })

                                                              
//                                      }
//                                   else {}

//                                })

//                            }

//                         })
    
//                    }
//                   callback(null,'one')
          
//         },
//         function reapply_stock(callback) {
//           for( let slii = 1; slii <= request.body.length ; slii++ )
//     {

//      Hb_products.findOne({ where: { PRODUCT_NAME:request.body.items[slii-1].PRODUCT_NAME } }).then(rec => {
                                      
//                          if(rec)

//                              {
                                
//                                 var coming_qty = request.body.items[slii-1].QTY;
//                                 console.log('coming qty..........',coming_qty);

//                                 if ( coming_qty > 0 )
//                                 {
                                  
                                 
//                                   var invo_qty = rec.AVAIL_QTY - coming_qty;

//                                   rec.update({AVAIL_QTY: invo_qty}).then(function(doc,err)
//                                   {
//                                       if(!err)
//                                       {
//                                         callback(null,'two')
//                                       }
//                                       else
//                                       {
//                                         return response.json({success:false, msg:err});
//                                       }

//                                   })
//                                 }
//                                 else
//                                 {}
                                
//                              }  })

//                 }

         
//         },
//          function he (err, results) {
//           //return response.json({success:false, msg:'Invoice Update Sucessfully'});
//           console.log('ki');
//          }
//       ])
    


//       // series([
//       //   function (callback) {
//       //     add_to_stock_from_slave(result,request,response)
//       //     callback(null, 'one')
//       //   },
//       //   function (callback) {
//       //   //  update_master(request,response)
//       //     callback(null, 'two')
//       //   },
//       //   function (callback) {
//       //    //  update_open_bal(request,response) 
//       //     callback(null, 'three')
//       //   },
//       //   function (callback) {
//       //     reapply_stock(request,response)
//       //    //  delete_on_slave(res,request,response)
//       //     callback(null, 'four')
//       //   },
//       //   function (callback) {
//       //    //    update_slave(request,response)
//       //     callback(null, 'five')
//       //   },
//       //   function (callback) {
//       //   //  delete_on_slave(res,request,response)
          
//       //     callback(null, 'six')
//       //   },

//       // ],
//       // // optional callback
//       // function (err, results) {
//       //   // the results array will equal ['one','two']
//       // })

      
        
        
//      }

//      else
//      {
//         return response.json({success:false, msg:'Invoice Not Found'});
//      }

//   })

// })


// function add_to_stock_from_slave(callback,result,req)
// {
//   var len = result.ITEM_LENGTH;
//   for( let sli = 1; sli <= len ; sli++ )
//   {
//     Invoice_slave.findOne({ where: { MASTER_ID:req.body.INVOICE_NUMBER , SI_NO : sli  } }).then(rt => {
//        if(rt)
//        {
//          let fetched = rt.QUANTITY;
//          console.log('fetched..............',fetched);
         
//          Hb_products.findOne({ where: { PRODUCT_NAME:rt.PRODUCT_NAME } }).then(rec => {
//           if(rec)
//           {          
//               var oq = rec.AVAIL_QTY;
//               console.log('avail qty.............',oq);
             
//               var nq = (oq-0) + (fetched - 0);
//               console.log('addded.............',nq);

//               rec.update({
//                 AVAIL_QTY : nq;
//               })

//           }
//           else {}

//         })

//        }

//     })
    
//   }

// }

// function update_stock(req,res)
// {

// for( let sli = 1; sli <= req.body.length ; sli++ )
//   {
//     console.log('sli..............',sli);
//      Invoice_slave.findOne({ where: { MASTER_ID:req.body.INVOICE_NUMBER , SI_NO : sli  } }).then(rt => {
//       if(rt)
//                {
//                    var old_qty = rt.QUANTITY

//                       Invoice_slave.findOne({ where: { MASTER_ID:req.body.INVOICE_NUMBER , SI_NO : sli }}).then(rox => {
//                       if(rox)
//                       {
//                          var oldQty  = rox.QUANTITY
//                          var pdt_name = rox.PRODUCT_NAME
//                          Hb_products.findOne({ where: { PRODUCT_NAME:pdt_name } }).then(rec => {
//                           if(rec)
//                           {
//                               var nw = oldQty + rec.AVAIL_QTY
//                                rec.update({AVAIL_QTY: nw}).then(function(doc,err)
//                                   { 
//                                     if(!err)
//                                        { 
//                                        }
//                                        else
//                                        {
//                                        } 
//                                      })
//                           }
//                           else{}
//                          })

//                        }

//                       }) }  

//                       })
 
//   }


// }


// function reapply_stock(callback,req,res)
// {
//   for( let slii = 1; slii <= req.body.length ; slii++ )
//     {

//      Hb_products.findOne({ where: { PRODUCT_NAME:req.body.items[slii-1].PRODUCT_NAME } }).then(rec => {
                                      
//                          if(rec)

//                              {
                                
//                                 var coming_qty = req.body.items[slii-1].QTY;
//                                 console.log('coming qty..........',coming_qty);

//                                 if ( coming_qty > 0 )
//                                 {
                                  
                                 
//                                   var invo_qty = rec.AVAIL_QTY - coming_qty;

//                                   rec.update({AVAIL_QTY: invo_qty}).then(function(doc,err)
//                                   {
//                                       if(!err)
//                                       {
//                                       }
//                                       else
//                                       {
//                                         return res.json({success:false, msg:err});
//                                       }

//                                   })
//                                 }
//                                 else
//                                 {}
                                
//                              }  })

//     }
// }



// function delete_on_slave(doc,req,res)
// {
//      var old_length = doc.ITEM_LENGTH ;

    
//      for ( let slc = req.body.length + 1 ; slc <= old_length ; slc++ )
//          {
       
//               Invoice_slave.findOne({ where: { MASTER_ID:req.body.INVOICE_NUMBER , SI_NO : slc  } }).then(rt => {

//                if(rt)
//                {
//                  var dispose = rt.QUANTITY;
//                  var produ = rt.PRODUCT_NAME;
//                   recon_stock(produ,dispose,req,res,slc);
//                }
//               else
//               {

//               }

//               })
//             } 
//       }


// function recon_stock(pdt,dispose,req,res,slc)
// {

//          Hb_products.findOne({ where: { PRODUCT_NAME:pdt } }).then(rec => {
                                      
//                          if(rec)

//                              {
//                                 var invo_qty = rec.AVAIL_QTY ;
//                                 var coming_qty = dispose ;
                                
                                
//                                   invo_qty = invo_qty + coming_qty

//                                   console.log('in invo_qty.....',invo_qty)

//                                   rec.update({AVAIL_QTY: invo_qty}).then(function(doc,err)
//                                   {
//                                       if(!err)
//                                       {
                                        
//                                         console.log('slc.after update.................',slc)
//                                         distroy_slave(req,res,slc)

//                                       }
//                                       else
//                                       {
//                                         return res.json({success:false, msg:err});
//                                       }

//                                   })


//                                 }
//                                 else
//                                 {
//                                    console.log('in else.....')
//                                 }
                                
//                              }) 
//        }

// function distroy_slave(req,res,slc)
// {
//   console.log('inside dis',req.body.INVOICE_NUMBER,)
//         Invoice_slave.destroy({  where: { MASTER_ID:  req.body.INVOICE_NUMBER , SI_NO : slc  }})
// }

// function update_slave(req,res)
// {


//    for ( var slc = 0; slc < req.body.length ; slc++ )
//      {
//           Invoice_slave.update({

//                    MASTER_ID: req.body.INVOICE_NUMBER,
//                    SI_NO: req.body.items[slc].SI_NO,
//                    PRODUCT_NAME: req.body.items[slc].PRODUCT_NAME,
//                    HSN_CODE: req.body.items[slc].HSN_CODE,
//                    QUANTITY: req.body.items[slc].QTY,
//                    PRICE: req.body.items[slc].PRICE,
//                    NET_TOTAL: req.body.items[slc].NET_PRICE,
//                    UNIT : req.body.items[slc].UNIT,
//                    IS_B2B : req.body.is_b2b,
//                    BILL_DATE: req.body.invoice_date
//                         } , {
//                               where: { MASTER_ID:  req.body.INVOICE_NUMBER ,IS_B2B:true, SI_NO : req.body.items[slc].SI_NO } }) 

//      }   

      

//   }
        



  


// function update_master(req,res)
// {


//    Invoice_master.update({

//          CUSTOMER_NAME : req.body.cus_name,
//          CUSTOMER_CITY : req.body.cus_city,
//          CUSTOMER_STREET : req.body.cus_street,
//          CUSTOMER_GST_IN : req.body.cus_gst,
//          CUSTOMER_PHONE : req.body.cus_phone,
//          CUSTOMER_PHONE2 : req.body.cus_phone2,
//          TRANS_MODE : req.body.tran_mode,
//          VEH_NO : req.body.veh_no,
//          PLACE_SUPPLY : req.body.place_of_supply,
//          BUNDLES : req.body.no_bundles,
//          BILL_DATE : req.body.invoice_date,
//          SUB_TOTAL   : req.body.sub_total,
//          TAX_COLLECTED      : req.body.total_tax,
//          GRAND_TOTAL    : req.body.grand_total,
//          ITEM_LENGTH    :req.body.length,
//          TOTAL_PAYED   :  (req.body.total_paid_today-0) + (req.body.total_pre_paid-0),
//          TOTAL_DUE    : req.body.total_due,
//          IS_PARTIAL_PAY : req.body.is_partial_pay
                  
//                   } , { 
//                           where: { INVOICE_NUMBER:  req.body.INVOICE_NUMBER, IS_B2B : true } })
// }

// function update_open_bal(request,responce)
// {

//     Invoice_master.findOne({ where: {INVOICE_NUMBER: request.body.INVOICE_NUMBER,IS_B2B: true }}).then(mas => {

//                    var cur_price = mas.GRAND_TOTAL
//                    var cus2_name = mas.CUSTOMER_NAME
//                    var gst_in = mas.CUSTOMER_GST_IN 
                        
//                      if(cur_price < request.body.grand_total)
//                                   {
//                                    var difee =  (request.body.grand_total - 0) - (cur_price-0)
//                            Hb_customers.findOne({ where: {CUSTOMER_NAME: cus2_name , GSTIN:gst_in  }}).then(pron => {

//                                               var op_bal = pron.OPENING_BALANCE
//                                               var sum = (op_bal-0) + (difee-0)
//                                               pron.update({
//                                                               OPENING_BALANCE : sum
//                                                          })
//                                                   })
                                   
//                                     }

//                                   if(cur_price >= request.body.grand_total)
//                                         {
//                                           var difee =  (request.body.grand_total - 0) - (cur_price-0)

//                                           Hb_customers.findOne({ where: {CUSTOMER_NAME: cus2_name , GSTIN:gst_in  }}).then(pron => {
//                                                     var op_bal = pron.OPENING_BALANCE
//                                                     var sum = (op_bal-0) + (difee-0)
//                                                     pron.update({
//                                                                  OPENING_BALANCE : sum
//                                                               })
                                           

//                                                  })
//                                       }
                                 
//   })


// }



