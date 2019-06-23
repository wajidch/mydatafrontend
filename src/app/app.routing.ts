import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Component

import { IndexComponent } from '../app/index/index.component';
import { LoginComponent } from '../app/login/login.component';
import { SignupComponent } from '../app/signup/signup.component';
import { CreateCvComponent } from '../app/create-cv/create-cv.component';
import { CvDetailComponent } from '../app/cv-detail/cv-detail.component';
import { CvEditComponent } from '../app/cv-edit/cv-edit.component';





export const routes: Routes = [
 
 
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Sign Up'
    }
  },
  {
    path: 'createcv',
    component: CreateCvComponent,
    data: {
      title: 'Create CV'
    }
  },
  {
    path: 'cvdetail',
    component: CvDetailComponent,
    data: {
      title: 'CV detail'
    }
  },
  {
    path: 'editcv',
    component: CvEditComponent,
    data: {
      title: 'Edit Cv'
    }
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
