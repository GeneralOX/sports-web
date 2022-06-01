import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  usr = {
    isEntreprise: false,
    isThisMyTeam: false,
    allowEdit: false,
    myTeam: -1,
    requestedTeam: -1,
  }

  createTeamName = "";
  createTeamModel = false;

  openModel = false;
  details: any = null;

  addPlayerModel = {
    name: "",
    email: "",
    teamId: 0,
  }

  constructor(private route: ActivatedRoute, private webService: WebService) { }



  ngOnInit(): void {
    this.loaduserInfo();

    let tmId = this.route.snapshot.paramMap.get('id');
    if (tmId != null)
      this.usr.requestedTeam = Number(tmId);

    this.usr.isThisMyTeam = (this.usr.requestedTeam == this.usr.myTeam);
    this.usr.allowEdit = (this.usr.isThisMyTeam && this.usr.isEntreprise);

    if (this.usr.requestedTeam != null)
      this.loadTeamInfo();
  }

  loaduserInfo() {
    let user = this.webService.getUserInfo();

    this.usr.isEntreprise = (user.role == 0);
    this.usr.myTeam = user.team;
    this.usr.requestedTeam = user.team;
  }

  getTeamLeader() {
    let leader = "None";
    (this.details.players as Array<any>)
      .forEach((v) => {
        if (v.isLeader)
          leader = v.name;
      })
    return leader;
  }
  
  makeLeader(id: any) {
    this.webService.setLeader({ teamId: this.usr.myTeam, userId: id })
      .subscribe(
        (r) => {
          this.loadTeamInfo();
          alert("New Leader set")
        }
      );
  }

  loadTeamInfo() {
    this.webService.getTeamDetails(this.usr.requestedTeam)
      .subscribe((res) => this.details = res);
  }

  createTeam() {
    this.webService.createTeam(this.createTeamName).subscribe(
      (res: any) => {
        this.createTeamModel = false;

        // update Localstorage
        let user = this.webService.getUserInfo();
        user.team = res.teamId;
        this.webService.setUserInfo(user);
        this.ngOnInit();
      },
      (err) => {
        alert(err);
      }
    );
  }

  deleteTeam() {
    this.webService.deleteTeam(this.usr.myTeam).subscribe(
      (r: any) => {
        alert(r.message);
        let user = this.webService.getUserInfo();
        user.team = null;
        this.webService.setUserInfo(user);
        window.location.reload();
      });
  }

  addPlayer() {
    // append team id to the json
    this.addPlayerModel.teamId = this.usr.myTeam;

    // Send data to server
    this.webService.addPlayerToTeam(this.addPlayerModel)
      .subscribe(
        (res) => {
          this.loadTeamInfo();
          this.openModel = false;
        },
        (err) => {
          console.log(err);
        }
      )
  }

  deletePlayer(id: number) {
    this.webService.deletePlayer(id).subscribe(
      (r: any) => {
        this.loadTeamInfo();
        alert(r.message);
      },
      (err) => {
        alert("Error please try again!");
      }

    );
  }



}
