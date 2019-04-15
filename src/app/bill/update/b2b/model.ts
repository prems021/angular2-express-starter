 export class body {
  constructor(
    
        
         public Invo_number: number,
         public value : number,
         
       
      
    
  ) {  }
}


 export class master {
  constructor(
    
        public INVOICE_NUMBER : number,
        public BILL_DATE: string,
        public CUSTOMER_NAME : string,
        public CUSTOMER_GST_IN : string,
        public CUSTOMER_ADDRESS : string,
        public CUSTOMER_CITY :string,
        public CUSTOMER_PHONE :number,
        public CUSTOMER_PHONE2 :number,
        public CUSTOMER_PAN : string,
        public GOLD_RATE : number,
        public GRAND_TOTAL : number,
        public HSN_CODE : number,
        public TOTAL_TAX: number,
        public TOTAL_GST: number,
        public TOTAL_CESS: number,
        public SUB_TOTAL: number,
        public TOTAL_DISCOUNT : number,
         public TOTAL_DUE : number,
          public TOTAL_PAID_TODAY : number,
          public ITEM_LENGTH : number,
          public IS_PARTIAL_PAY : boolean,
        public items : slave []
         
       
      
    
  ) {  }
}

 export class slave {
  constructor(
    
       




        public MASTER_ID: number,
        public  SI_NO : number,
        public PRODUCT_NAME : string,
        public QUANTITY : number,
        public VOA : number,
        public GROSS_WEIGHT : number,
        public GROSS_WEIGHT2 : number,
        public GROSS_WEIGHT3 : number,
        public GROSS_WEIGHT_Mock : number,
        public GROSS_WEIGHT_Mock2 : number,
        public STONE_VALUE :number,
        public STONE_WEIGHT : number,
        public STONE_WEIGHT2 : number,
        public STONE_WEIGHT_Mock : number,
        public STONE_WEIGHT_Mock2 : number,
        public STONE_WEIGHT3 : number,
        public VOAP : number,
        public NET_WEIGHT : number,
        public NET_TOTAL : number,
       
         
       
      
    
  ) {  }
}




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


    export class figure {
  constructor(
  
 public    number_to_convert: number,
 public    fraction : number,
 public  msg: string
 
  


  ) {} }
