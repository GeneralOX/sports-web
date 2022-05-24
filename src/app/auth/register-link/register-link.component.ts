import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-link',
  templateUrl: './register-link.component.html',
  styleUrls: ['../auth.component.css']
})

export class RegisterLinkComponent {
  errorMsgs = "";

  form = {
    id: 1,
    age: '',
    password: '',
    phone: '',
    position: '',
  }
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let userId = this.route.snapshot.paramMap.get('id');
    if (userId != null) {
      this.form.id = Number(userId);
    } else {
      this.router.navigate(["/"]);
    }
  }

  onSubmit(): void {
    this.authService.SignUpFromLink(this.form)
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
