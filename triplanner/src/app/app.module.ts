import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms' 
import { DataService } from './data.service';
import { RouterModule} from '@angular/router' // for routing
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,MatCardModule,MatMenuModule,MatToolbarModule,MatIconModule} from '@angular/material';

import { AppComponent } from './app.component';
import { CreateplanComponent } from './feature/createplan/createplan.component';
import { DeleteplanComponent } from './feature/deleteplan/deleteplan.component';
import { CoPlanningComponent } from './feature/co-planning/co-planning.component';
import { EditplanComponent } from './feature/editplan/editplan.component';
import { ReviewPostComponent } from './feature/review-post/review-post.component';
import { FavnotiComponent } from './feature/favnoti/favnoti.component';
<<<<<<< HEAD
import { RegisterComponent } from './feature/register/register.component';
import { LoginComponent } from './feature/login/login.component';
import { MenubarComponent } from './menubar/menubar.component';
=======
import { ActivitiesComponent } from './feature/components/activities/activities.component';
import { GenerateplanComponent } from './feature/components/generateplan/generateplan.component';
>>>>>>> 8e4f79839fe6c8d7503d22370d6c6310bf9e314e

@NgModule({
  declarations: [
    AppComponent,
    CreateplanComponent,
    DeleteplanComponent,
    CoPlanningComponent,
    EditplanComponent,
    ReviewPostComponent,
    FavnotiComponent,
<<<<<<< HEAD
    RegisterComponent,
    LoginComponent,
    MenubarComponent
=======
    ActivitiesComponent,
    GenerateplanComponent
>>>>>>> 8e4f79839fe6c8d7503d22370d6c6310bf9e314e
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,

    //  routing to component
    RouterModule.forRoot([
      {
        path: '', 
        component: LoginComponent
      },
      {
        path:'createplan',
        component: CreateplanComponent
      },
      {   
        path:'deleteplan',
        component: DeleteplanComponent
      },
      {      
        path:'co-planning',
        component:CoPlanningComponent
      },
      {
        
        path:'editplan',
        component: EditplanComponent
      },
      {
        
        path:'favnoti',
        component: FavnotiComponent
      },
      {
      
        path:'review-post',
        component: ReviewPostComponent
      },
      {
        path:'generateplan',
        component: GenerateplanComponent
      },

    ])
  ],
  providers: [DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
