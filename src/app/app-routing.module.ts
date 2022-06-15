import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService as adminGuard } from './guards/admin-guard.service';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { WebGuardService as WebGuard } from './guards/web-guard.service';

const routes: Routes = [
  { path: 'auth', canActivate: [AuthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', canActivate: [adminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'app', canActivate: [WebGuard], loadChildren: () => import('./web/web.module').then(m => m.WebModule) },
  { path: '**', redirectTo: "app", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
