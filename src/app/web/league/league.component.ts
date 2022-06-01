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
  isEntreprise = false;
  leagues: any[] = [];
  constructor(private webSerivce: WebService, private route: ActivatedRoute) {
    let user = webSerivce.getUserInfo();

    this.isEntreprise = (user.role == 0);
    this.myTeamId = user.team;
  }

  ngOnInit() {
    this.webSerivce.getAllLeagues().subscribe((_res) => {
      this.leagues = _res;
    })
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
}
