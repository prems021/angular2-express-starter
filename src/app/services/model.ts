

export class product_model 
{
constructor(
          
          public PRODUCT_NAME: string,
          public PRODUCT_CODE: string,
          public NET_PRICE: number,
          public QUANTITY : number,
          public TAX: number,
          public AVAIL_QTY : number,
          public NET_PURCHASE_PRICE :number,
          public UNIT : string,
         
          
) { }
}

export class invoice_slave 
{
constructor(
          public SI_NO: number,
          public PRODUCT_NAME: string,
          public HSN_CODE: string,
          public QTY : number,
          public TAX : number,
          public PRICE: number,
          public UNIT : string,
          public NET_PRICE : number,
          
          
) { }
}

export class taxes
{
constructor(
          public SI_NO: number,
          public TAX_NAME: string,
          public TAX_PER: number,
          public TAX_AMT  : number
          
          
) { }
}






   export class invoice {
  constructor(
  
  public  INVOICE_NUMBER: number,
  public  length : number,
  public  items:invoice_slave[],
  public  taxes:taxes[],
  public  cus_name: string,
  public  cus_city : string,
  public  cus_gst : string,
  public  cus_phone : string,
  public  cus_mobile : string,
  public  cus_street : string,
  public  pan_no : string,
  public  place_of_supply : string,
  public  veh_no : string,
  public  total_paid_today : number,
  public  total_pre_paid : number,
  public  sub_total: number,
  public  total_tax: number,
  public  grand_total: number,
  public  total_due : number,
  public  is_b2b : boolean,
  public  is_partial_pay : boolean,
  public  tran_type : number,
  public  no_bundles : number,
  public  invoice_date : Date,
  public invo_num_flag : number,
  


  ) {} }

 export class i_number {
  constructor(
    
        public text : string,
        public count: number

    
    
  ) {  }
}

 


    export class figure {
  constructor(
  
            public  number_to_convert: number,
            public  fraction : number,
            public  msg: string
 
          ) {} }