import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }
  errorMsgs = "";
  form = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit(): void {
    this.authService.SignUp(this.form)
      .subscribe(
        (_response) => {
          this.authService.redirect(_response);
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
