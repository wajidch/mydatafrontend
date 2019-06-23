import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private router: Router,private userService:UserService,private spinner:NgxSpinnerService ){

  }
  loginForm: FormGroup;
  message;
  email;
  password;
  loginRes;
  savedEmail;
  savedPassword
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
   
    });
  }
  login(val) {
    this.spinner.show();
    this.email = val.email;
    this.password = val.password;
    this.userService.login(val.email, val.password).subscribe(
      (res: any) => {
        console.log(res)
        this.loginRes = res;
        if (this.loginRes.statusCode === 314) {
          this.spinner.hide();
         this.message=this.loginRes.message;
        } else if (this.loginRes.statusCode === 404) {
          this.spinner.hide();
            this.message=this.loginRes.message;
        } else if (this.loginRes.statusCode === 200) {
          // this.preDashboard = false;
         
          this.message='';
          // localStorage.setItem('token', this.loginRes.data.token);
          // localStorage.setItem('user_id', this.loginRes.data.id);
          localStorage.setItem('email', this.loginRes.response.user_email);
          
          this.router.navigate(['']);
          this.spinner.hide();
          
         
        } 
      },
      (error: any) => {
      
      });
     }
}
