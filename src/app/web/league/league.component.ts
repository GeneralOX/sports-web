import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  myTeamId = 0;

  screen: any = {
    view: 1,
    isEntreprise: false,
    leagueId: -1,
    leagues: []
  }

  constructor(private webSerivce: WebService, private route: ActivatedRoute) {
    let user = webSerivce.getUserInfo();
    this.screen.isEntreprise = (user.role == 0);
    this.myTeamId = user.team;
  }

  ngOnInit() {
    this.screen.leagueId = this.route.snapshot.paramMap.get('id') ?? "-1";
    if (this.screen.leagueId == "-1") {
      this.screen.view = 1;
      this.webSerivce.getAllLeagues().subscribe((_res) => {
        this.screen.leagues = _res;
      })
    }
    else {
      this.screen.view = 2;
      this.webSerivce.getLeagueDetails(this.screen.leagueId)
        .subscribe(
          (_res) => {
            this.screen.league = _res.league;
            this.screen.teams = _res.teams;
          })
    }
  }

  joinLeague(leagueId: number) {
    this.webSerivce
      .joinLeague({ leagueId: leagueId, teamId: this.myTeamId })
      .subscribe(
        (r: any) => {
          console.log(r);
          if (r.alreadyJoin) {
            alert("You have been already joined this league!");
          } else {
            alert("You have been join the league :)");
          }
        }
      );

  }

  // FUNC
  clearDate(e: string) {
    return e.split("T")[0];
  }

  getTeamName(id: number) {
    var result;
    let object = this.screen.teams;

    for (const key in object) {
      const r = object[key];
      if (r.id == id) {
        result = r.name;
        break;
      }
    }
    return result;
  }
}
