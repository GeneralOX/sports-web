import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { LeagueComponent } from './league/league.component';
import { MatchComponent } from './match/match.component';
import { RankComponent } from './rank/rank.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'league', component: LeagueComponent },
            { path: 'rank/:id', component: RankComponent },

            { path: 'match', component: MatchComponent },
            { path: 'match/:id', component: MatchComponent },

            { path: 'team', component: TeamComponent },
            { path: 'team/:id', component: TeamComponent },

            { path: 'profile', component: ProfileComponent },
        ]
    },
    { path: '**', redirectTo: 'team', pathMatch: 'full' },

];

export const WebRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);