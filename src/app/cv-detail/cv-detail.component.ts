import { Component, OnInit } from '@angular/core';
import {UserService} from '../common/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-cv-detail',
  templateUrl: './cv-detail.component.html',
  styleUrls: ['./cv-detail.component.css']
})
export class CvDetailComponent implements OnInit {

  constructor(private userService:UserService,
    private spinner:NgxSpinnerService,private route:Router) { }
detailcv
media;
  ngOnInit() {
    this.getDetailCV();
    this.media=environment.ImagePath;
  }

  getDetailCV(){
    let email=localStorage.getItem('detailCvemail')
    this.userService.detail(email).subscribe(
      (res: any) => {
        console.log(res)
   this.detailcv=res.response;
      });
  }
  edit(){

    this.route.navigate(['editcv']);
    
  }
}
