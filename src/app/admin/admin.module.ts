import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { LeagueComponent } from './league/league.component';

import { AdminRouting } from './admin.routing';
import { AdminService } from './admin.service';

@NgModule({
  declarations: [
    HomeComponent,
    LeagueComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AdminRouting
  ],
  providers: [AdminService]
})
export class AdminModule { }
