import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WebRouting } from './web.routing';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { LeagueComponent } from './league/league.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchComponent } from './match/match.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    TeamComponent,
    ProfileComponent,
    LeagueComponent,
    MatchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    WebRouting
  ],
  providers: [WebService]
})
export class WebModule { }
