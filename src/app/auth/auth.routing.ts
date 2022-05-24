import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { PlayerComponent } from './player/player.component';
import { RegisterComponent } from './register/register.component';
import { RegisterLinkComponent } from './register-link/register-link.component';

const routes: Routes = [
    { path: 'entreprise', component: EntrepriseComponent, },
    { path: 'player', component: PlayerComponent, },
    { path: 'register', component: RegisterComponent, },
    { path: 'register-link/:id', component: RegisterLinkComponent, },

    { path: '', redirectTo: 'entreprise', pathMatch: 'full' },
];

export const AuthRouting: ModuleWithProviders<any> = RouterModule.forChild(routes);