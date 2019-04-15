export class pdt_model 
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

export class invo_slave 
{
constructor(
          public SI_NO : number,
          public PRODUCT_NAME : string,
          public QTY : number,
          public HSN_CODE : number,
          public UNIT : string,
          public PRICE : number,
          public TAX : number,
          public NET_PRICE : number,
          
          



          
) { }
}





   export class invoice {
  constructor(
  
  public  INVOICE_NUMBER: number,
  public  length : number,
  public  items:invo_slave[],
  public  sub_total: number,
  public  grand_total: number,
  public  is_b2b : boolean,
  public  tran_type : number,
 
  
  


  ) {} }

 export class i_number {
  constructor(
    
    public text : string,
        public count: number

    
    
  ) {  }
}

 




    export class figure {
  constructor(
  
 public    number_to_convert: number,
 public fraction : number,

  public  msg: string
 
  


  ) {} }