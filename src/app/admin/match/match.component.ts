import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  LeagueInfo: any = {};
  Matches: any[] = [];
  Teams: any[] = [];
  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let leagueId = this.route.snapshot.paramMap.get('id');
    if (leagueId != null) {
      this.form.leagueId = leagueId;
      this.LoadLeagueRank(Number(leagueId));
    }
  }

  LoadLeagueRank(id: number) {
    this.adminService.getleagueData(id)
      .subscribe(
        (r: any) => {
          this.LeagueInfo = r.league;
          this.Teams = r.teams;
          this.Matches = r.matches;
        })
  }

  // Create Match
  availableField: any = [];
  newMatchView = 1;
  form: any = {
    leagueId: 0,
    fieldId: 0,
    team1: "",
    team2: "",
    date: "",
    time: ""
  }

  selectField() {
    this.availableField = [];
    this.adminService
      .getAvailableField(this.form.date)
      .subscribe(
        (r: any) => {
          r.fieldList.forEach((e: any) => {
            this.availableField
              .push(
                {
                  id: e.id,
                  name: e.name,
                  time: this.getAvailableTime(r.matchInDay, e.id),
                })
          });
        }
      );
    // if (this.form.team1 == this.form.team2)
    //   return;
    // if (this.form.date == "")
    //   return;
    this.newMatchView = 2;
    console.log(this.form);
  }
  selectTime(time: string, fieldId: number) {
    this.form.time = time;
    this.form.fieldId = fieldId;

    this.adminService.addMatch({
      leagueId: Number(this.form.leagueId),
      fieldId: Number(this.form.fieldId),
      team1Id: Number(this.form.team1),
      team2Id: Number(this.form.team2),
      startDate: this.form.date,
      startTime: this.form.time
    })
      .subscribe(
        (r) => {
          location.reload();
        }
      )
    console.log(this.form);
  }
  getAvailableTime(matches: any[], fieldId: any) {
    let time = [
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ];

    matches.forEach((r) => {
      if (r.fieldId == fieldId) {
        time = time.filter((v) => v != r.startTime);
      }
    })
    return time;
  }

  // SET REUSLT 
  result = "";
  resultData: any = {}

  openModel = false;

  selectMatch(id: any, leagueId: any, team1Id: number, team2Id: number) {
    this.resultData = { id, leagueId, team1Id, team2Id }
    this.openModel = true;
  }
  setResult() {
    this.openModel = false;
    this.resultData.score = this.result;
    this.adminService.setResult(this.resultData)
      .subscribe((r) => console.log(r))
  }

  // FUNC
  getDate(e: string) {
    return e.split("T")[0];
  }
  getTime(e: string) {
    return e.split("T")[1].split(".")[0];
  }
}
