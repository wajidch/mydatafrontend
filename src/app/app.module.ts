import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateCvComponent } from './create-cv/create-cv.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../src/app/common/user.service'
import { HttpClientModule } from '@angular/common/http';
import { CvDetailComponent } from './cv-detail/cv-detail.component';
import { CvEditComponent } from './cv-edit/cv-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SignupComponent,
    CreateCvComponent,
    CvDetailComponent,
    CvEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
