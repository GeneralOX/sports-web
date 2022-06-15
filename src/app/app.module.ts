import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminGuardService } from './guards/admin-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { WebGuardService } from './guards/web-guard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuardService, WebGuardService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
