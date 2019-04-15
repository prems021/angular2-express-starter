import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import  { main_model } from './model'

@Component({
  selector: 'app-test',
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class TestComponents implements OnInit {

arrayOfValues : any [] = [];



view_model = new main_model([]);
loop : number = 0;
view : boolean = false;
len : number  = 0;

     constructor(private router: Router,private ds: DataService) {
    
     
    
  } 
  

  ngOnInit() {

  
   this.get_customers_subs_list()
  }
get_customers_subs_list()
{

 this.ds.get_customers_subs_list().subscribe((jsonData) => { this.getval2(jsonData)  
                      },(err) => console.error(err),
                       
                      );

}

getval2(s:any)
{

 
this.arrayOfValues = s
this.len = this.arrayOfValues.length
for (this.loop = 0; this.loop < this.len; this.loop++)
 {
  this.push();
  this.view_model.item[this.loop].EMAIL = this.arrayOfValues[this.loop].EMAIL
  this.view_model.item[this.loop].FIRST_NAME = this.arrayOfValues[this.loop].FIRST_NAME
  this.view_model.item[this.loop].LAST_NAME = this.arrayOfValues[this.loop].LAST_NAME
  this.view_model.item[this.loop].RATING_STAR = this.arrayOfValues[this.loop].RATING_STAR
  this.view_model.item[this.loop].SI = this.loop + 1
 }




 
 this.view = true
}


push()
{
    
  this.view_model.item.push({"SI":0,"ID":0,"FIRST_NAME":'',"LAST_NAME":'',"EMAIL":'',"RATING_STAR":0})
}




}
