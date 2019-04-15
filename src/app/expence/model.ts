export class expense_slave
{
constructor(
          public SI_NO: number,
          public PRODUCT_NAME: string,
          public QTY : number,
          public UNIT: string,
          public HSN_CODE : number,
          public PRICE : number,
          public NET_PRICE : number

        
          
          
) { }
}






   export class exp_invos {
  constructor(
  
  public  E_ENTRY_NUMBER: number,
  public Exp_catogory : string,
  public  length : number,
  public  items:expense_slave[],
  public  Vendor_name: string,
  public  Bill_no : number,
  public grand_total : number,
  public  Date : string

  ) {}
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
