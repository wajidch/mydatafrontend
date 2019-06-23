import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private router: Router,private userService:UserService,private spinner:NgxSpinnerService ){

  }
  signupForm: FormGroup;
  message;
  email;
  password;
  signupRes;
  savedEmail;
  savedPassword
  ngOnInit() {
    this.signupForm = new FormGroup({
      user_name: new FormControl('',[Validators.required]),

      user_email: new FormControl('',[Validators.required]),
      user_password: new FormControl('',[Validators.required]),
   
    });
  }

  signup(val){
    this.spinner.show();
    
    this.userService.signup(val).subscribe(
      (res: any) => {
        console.log(res)
        this.signupRes = res;
        if (this.signupRes.statusCode === 314) {
          this.spinner.hide();
         this.message=this.signupRes.message;
        } else if (this.signupRes.statusCode === 404) {
          this.spinner.hide();
            this.message=this.signupRes.message;
        } else if (this.signupRes.statusCode === 200) {
          // this.preDashboard = false;
         
          this.message='';
          // localStorage.setItem('token', this.loginRes.data.token);
          // localStorage.setItem('user_id', this.loginRes.data.id);
          
          this.router.navigate(['login']);
          this.spinner.hide();
          
         
        } 
      },
      (error: any) => {
      
      });
  }
}
