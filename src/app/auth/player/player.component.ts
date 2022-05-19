import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['../auth.component.css']
})
export class PlayerComponent {

  constructor(private authService: AuthService) { }
  errorMsgs = "";
  form = {
    email: '',
    password: ''
  };

  onSubmit(): void {
    this.authService.SignInPlayer(this.form)
      .subscribe(
        (response) => {

        },
        (_err: HttpErrorResponse) => {
          if ((typeof _err.error.message) == "string")
            this.errorMsgs = _err.error.message;
          else
            this.errorMsgs = _err.error.message[0];
          setTimeout(() => {
            this.errorMsgs = "";
          }, 5000);
        });
  }
}
