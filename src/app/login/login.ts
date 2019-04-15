import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { AuthenticationService } from '../services/login.service';

import { AuthGuard } from '../services/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
 

 
   loginForm: FormGroup;
   isclicked : boolean= false;
  constructor( private router: Router,private fb: FormBuilder, private aS: AuthenticationService , private ag: AuthGuard) {   }
  ngOnInit()  {
    this.isclicked=false;
   this.loginForm = this.fb.group({
            username: [''],
            password: ['']             
                                      });

  }
    


  login(){
  
  this.isclicked = true;
    this.aS.login(this.loginForm.value)
     .subscribe((jsonData) => { this.getjson(jsonData)
                      },(err) => console.error(err),
                    
                      );

  }


   
  getjson(json :any)
  {
    
   
   if (json.success === false)
   {
      alert(json.msg);

   }

   else  
   {
      this.ag.token = true;
      this.router.navigate(['/dash']);
   }

 

   
  }
}

