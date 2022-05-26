import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LeagueComponent } from './league/league.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'league', component: LeagueComponent },
            { path: 'league/:id', component: LeagueComponent },
        ]
    },
    { path: '**', redirectTo: 'league', pathMatch: 'full' },

];

export const AdminRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);