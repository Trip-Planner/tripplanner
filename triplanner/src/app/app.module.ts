import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms' 
import { DataService } from './data.service';
import { RouterModule} from '@angular/router' // for routing

import { AppComponent } from './app.component';
import { CreateplanComponent } from './feature/createplan/createplan.component';
import { DeleteplanComponent } from './feature/deleteplan/deleteplan.component';
import { CoPlanningComponent } from './feature/co-planning/co-planning.component';
import { EditplanComponent } from './feature/editplan/editplan.component';
import { ReviewPostComponent } from './feature/review-post/review-post.component';
import { FavnotiComponent } from './feature/favnoti/favnoti.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateplanComponent,
    DeleteplanComponent,
    CoPlanningComponent,
    EditplanComponent,
    ReviewPostComponent,
    FavnotiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    //  routing to component
    RouterModule.forRoot([
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
      

    ])
  ],
  providers: [DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
