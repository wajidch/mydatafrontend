import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-cv',
  templateUrl: './create-cv.component.html',
  styleUrls: ['./create-cv.component.css']
})
export class CreateCvComponent implements OnInit {
  email:any=localStorage.getItem('email');

  constructor(private router: Router,private userService:UserService,
    private spinner:NgxSpinnerService,
    private _http: HttpClient) { }
  createCvForm: FormGroup;
  createCVRes;
  message;
  ProfilePicIMG
  ngOnInit() {
    this.createCvForm = new FormGroup({
      user_name: new FormControl(''),

      user_phone: new FormControl(''),

      website: new FormControl(''),
      address: new FormControl(''),
      job_title: new FormControl(''),
      company_name: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      skill: new FormControl(''),
      breif_description:new FormControl('')

   
    });
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
                  this.ProfilePicIMG=res.fileName
     
      }
    );
         
     

      }
      }

      }
  createCv(val){

    let createCvobj={
      user_name:val.user_name,
      user_email:this.email,
      user_phone:val.user_phone,
      website:val.website,
      address:val.address,
      job_title:val.job_title,
      company_name:val.company_name,
      startDate:val.startDate,
      endDate:val.endDate,
      skill:val.skill,
      profile_picture:this.ProfilePicIMG,
      breif_description:val.breif_description,
      isCV:1
    }
    console.log("pro",createCvobj)
    this.spinner.show();
    
    this.userService.createCV(createCvobj).subscribe(
      (res: any) => {
        console.log(res)
        this.createCVRes = res;
        if (this.createCVRes.statusCode === 314) {
          this.spinner.hide();
         this.message=this.createCVRes.message;
        } else if (this.createCVRes.statusCode === 404) {
          this.spinner.hide();
            this.message=this.createCVRes.message;
        } else if (this.createCVRes.statusCode === 200) {
          // this.preDashboard = false;
         
          this.message='';
          // localStorage.setItem('token', this.loginRes.data.token);
          // localStorage.setItem('user_id', this.loginRes.data.id);
          
          this.router.navigate(['']);
          this.spinner.hide();
          
         
        } 
      },
      (error: any) => {
      
      });
  }
}
