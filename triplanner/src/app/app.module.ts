import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms' 
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { CreateplanComponent } from './feature/createplan/createplan.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateplanComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
