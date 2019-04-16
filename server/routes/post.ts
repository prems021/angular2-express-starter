import { Request, Response, Router } from "express";
import { Sequelize, sequelize } from './dbcon';
import { Hb_products } from '../model/products';
import { Invoice_master } from '../model/invoice_master';
import { Invoice_slave } from '../model/invoice_slave';
import { Tax_detail } from '../model/tax_details';
import { Hb_customers } from '../model/hb_customers';


const postRouter: Router = Router();


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

