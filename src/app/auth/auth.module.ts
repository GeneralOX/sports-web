import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PlayerComponent } from './player/player.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { AuthRouting } from './auth.routing';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RegisterLinkComponent } from './register-link/register-link.component';
@NgModule({
  declarations: [
    RegisterComponent,
    PlayerComponent,
    EntrepriseComponent,
    RegisterLinkComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRouting,
    FormsModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
