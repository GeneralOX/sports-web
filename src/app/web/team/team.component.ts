import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  constructor(private route: ActivatedRoute, private webService: WebService) { }

  app = {
    isPlayer: false,
    hasTeam: false,
    teamId: -1,
    myTeam: true,
    createTeam: false,
    createTeamName: ""
  }

  addPlayerModel = {
    name: "",
    email: "",
    teamId: 0,
  }
  details: any = null;

  ngOnInit(): void {
    // check if player or entreprise
    let user = this.webService.getUserInfo();
    if (user) {
      this.app.isPlayer = (user.role != 0);
      this.app.hasTeam = (user.team != null);
      this.app.teamId = user.team;
    }
    // Check requested team
    let tmId = this.route.snapshot.paramMap.get('id');
    if (tmId != null) {
      this.app.myTeam = (this.app.teamId == Number(tmId));
      this.app.teamId = Number(tmId);
    }

    // requestTeamInfo
    if (this.app.teamId != null)
      this.loadTeamInfo();

  }

  loadTeamInfo() {
    this.webService.getTeamDetails(this.app.teamId)
      .subscribe((res) => this.details = res);
  }

  createTeam() {
    this.webService.createTeam(this.app.createTeamName).subscribe(
      (res: any) => {
        this.app.hasTeam = true;
        this.app.teamId = res.teamId;
        this.app.createTeam = false;

        // update Localstorage
        let user = this.webService.getUserInfo();
        user.team = res.teamId;
        this.webService.setUserInfo(user);

        // Reload teamInfo
        this.details = {
          id: res.id,
          name: this.app.createTeamName,
          players: []
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addPlayer() {
    // append team id to the json
    this.addPlayerModel.teamId = this.app.teamId;

    // Send data to server
    this.webService.addPlayerToTeam(this.addPlayerModel)
      .subscribe(
        (res) => {
          console.log(res);
        }
      )
  }
}
