import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  IsPlayerModel = true;
  form = {
    age: '',
    password: '',
    phone: '',
    position: '',
  }

  entreForm: any = {
    name: "",
    password: ""
  }

  constructor(private webService: WebService) {
    let user = this.webService.getUserInfo();
    this.IsPlayerModel = !(user.role == 0);

    if (this.IsPlayerModel) {
      // LOAD USER
    } else {
      // LOAD ENTREPRISE
      this.webService.getEntredata().subscribe(
        (r) => {
          this.entreForm = r;
          this.entreForm.password = "";
        }
      );

    }
  }
  ngOnInit(): void { }

  onSubmit() {
    if (this.IsPlayerModel) {
      // UPDATE USER
    } else {
      // UPDATE ENTREPRISE
      this.webService
        .updateEntrepriseData(this.entreForm)
        .subscribe((r: any) => {
          console.log(r);
          let user = this.webService.getUserInfo();
          r.access_token = user.access_token;
          this.webService.setUserInfo(r);
          alert("user updated!");
        })
    }
  }
}
