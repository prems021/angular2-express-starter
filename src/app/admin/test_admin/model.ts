 export class subs_model {
    constructor(
  public SI : number,    
  public ID : number,
  public FIRST_NAME : string,
  public LAST_NAME : string ,
  public EMAIL : string,
  public RATING_STAR : number
      
    ) {  }
  }


  export class main_model {
  constructor(
    
         
         public item : subs_model[],
        
       
      
    
  ) {  }
}
