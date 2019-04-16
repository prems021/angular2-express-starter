import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { contentHeaders } from './headers' ;

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

   
    names: string;
    total = 0;
    constructor(private http: Http) { }



     login(model:any) {

        let body= JSON.stringify(model); 
       let user = model.username;
        this.names= user;
             
        
        return this.http.post('/api/user/login_check', body, { headers: contentHeaders})
            .map((res: Response) => res.json())
            
            
    }
           
 server_status()
 {

    
    
    
      return this.http.post('/api/user/server_check',{headers : contentHeaders})  
      .map((res: Response) => res.json())
 
    

 }

  

  get_username()
  {
    return this.names;
  }

    adduser(model:any) {

        let body= JSON.stringify(model); 

        
        return this.http.post('/api/public/add_user', body, { headers: contentHeaders})
            .map((response: Response) => {
                
                
                {
                    let postr = response.json();
                   console.log('responce=',postr)
                    
                }
            })   .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
            
    }
}
