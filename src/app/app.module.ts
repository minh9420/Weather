import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { DetailComponent } from './main/detail/detail.component';

import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './main/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AbcComponent } from './main/abc/abc.component';
import { InfoComponent } from './info/info.component';
// import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    MenuComponent,
    MainComponent,
    
    LoginComponent,
         AbcComponent,
         InfoComponent,
     
  ],
  imports: [
    FormsModule,    //added here too
    ReactiveFormsModule,
    AppRoutingModule, //added here too
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  exports: [
    FormsModule,
       //added here too
    ReactiveFormsModule,
    AppRoutingModule, //added here too
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
