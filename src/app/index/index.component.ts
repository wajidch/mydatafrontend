import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {UserService} from '../common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';

declare const $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  email:any=localStorage.getItem('email');
  constructor(private router: Router,private userService:UserService,
    private spinner:NgxSpinnerService) { }

    List;
    mostviewList;
    media
  ngOnInit() {
    this.getCVlist();
    this.mostviewCV();
    this.media=environment.ImagePath;

  }
  detailView(val){
    console.log("val",val);
    localStorage.setItem('detailCvemail',val);
    this.router.navigate(['cvdetail']);

  }
  
  logout(){
    this.email=localStorage.removeItem('email');
    console.log("email",this.email)
    
    this.router.navigate(['']);

  }
getCVlist(){
  this.userService.CVlist().subscribe(
    (res: any) => {
      console.log(res)
 this.List=res.response;
    });
}

mostviewCV(){
  this.userService.mostviewCV().subscribe(
    (res: any) => {
      console.log(res)
 this.mostviewList=res.response;
    });
}
}
