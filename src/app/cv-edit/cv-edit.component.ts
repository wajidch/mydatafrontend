import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.css']
})
export class CvEditComponent implements OnInit {

  email:any=localStorage.getItem('email');

  constructor(private router: Router,private userService:UserService,
    private spinner:NgxSpinnerService,
    private _http: HttpClient) { }
  createCvForm: FormGroup;
  createCVRes;
  message;
  ProfilePicIMG
  editModal={
    user_id:0,
    user_name:'',
    user_email:'',
    user_phone:'',
    website:'',
    address:'',
    job_title:'',
    company_name:'',
    startDate:'',
    endDate:'',
    skill:'',
    breif_description:'',
    profile_picture:'',
    isCV:1
    
  }
  ngOnInit() {
    this.getCVData();
    
  }
  logout(){
    this.email=localStorage.removeItem('email');
    console.log("email",this.email)
    
    this.router.navigate(['']);

  }
  upload (event: any) {
    if (event && event.target.files.length > 0) {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/*');
      const file = event.target.files[0];
      console.log(file);
      console.log('filesize' , file.size / 1000000);
      const filesize = file.size/1000000;
      const type =  file.type;
      if (filesize <= 5 && (type === 'image/jpeg' || type === 'image/png' ) ) {
       
         console.log('true');
        const formData = new FormData();
        formData.append('file', file , file.name);
        const reader = new FileReader();
        
        reader.onload = (value: any) => {
         // this.imgURL = value.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this._http.post(environment.baseUrl+ 'upload' ,  formData,
        {headers: headers}).subscribe(
      (res: any) => {
                  console.log("res",res)
                  this.editModal.profile_picture=res.fileName
     
      }
    );
         
     

      }
      }

      }
 //Get data of cv against id to edit
  getCVData(){
    let email=localStorage.getItem('detailCvemail')
    this.userService.detail(email).subscribe(
      (res: any) => {
        console.log(res)
   
        this.editModal.user_name=res.response.user_name;
        this.editModal.user_email=res.response.user_email;
        this.editModal.user_phone=res.response.user_phone;
        this.editModal.address=res.response.address;
        this.editModal.breif_description=res.response.breif_description;
        this.editModal.company_name=res.response.company_name;
        this.editModal.endDate=res.response.endDate;
        this.editModal.job_title=res.response.job_title;
        this.editModal.skill=res.response.skill;
        this.editModal.startDate=res.response.startDate;
        this.editModal.website=res.response.website;
        console.log("edit",this.editModal)
   
      });
  }
updateCV(){
  let email=localStorage.getItem('detailCvemail')
this.editModal.user_id=parseInt(email);
console.log("updated",this.editModal)
this.userService.updateCV(this.editModal).subscribe(
  (res: any) => {
      console.log("u",res)
this.router.navigate([''])
  })
}
}
