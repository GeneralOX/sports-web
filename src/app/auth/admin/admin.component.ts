import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['../auth.component.css']
})
export class AdminComponent {

  constructor(private authService: AuthService) { }
  errorMsgs = "";
  form = {
    email: '',
    password: ''
  };

  adm = {
    email: '',
    password: ''
  };


  onSubmit(): void {
    this.authService.SignInAdmin(this.form)
      .subscribe(
        (_response) => {
          this.authService.adminRedirect(_response);
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

  onRegister(): void {
    this.authService.SignUpAdmin(this.adm)
      .subscribe(
        (_response) => {
          this.authService.adminRedirect(_response);
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
