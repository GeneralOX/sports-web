import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { WebGuardService as WebGuard } from './guards/web-guard.service';

const routes: Routes = [
  { path: 'auth', canActivate: [AuthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'app', canActivate: [WebGuard], loadChildren: () => import('./web/web.module').then(m => m.WebModule) },
  { path: '**', redirectTo: "app", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
