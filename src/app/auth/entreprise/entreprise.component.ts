import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['../auth.component.css']
})
export class EntrepriseComponent {

  constructor(private authService: AuthService) { }
  errorMsgs = "";
  form = {
    email: '',
    password: ''
  };

  onSubmit(): void {
    this.authService.SignInEntreprise(this.form)
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
