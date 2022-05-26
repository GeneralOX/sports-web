import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  isMain = true;

  leagues: any[] = [];
  details: any = { league: {}, rank: [] };
  constructor(private adminService: AdminService, private route: ActivatedRoute) {
    // let user = adminSerivce.getUserInfo();
    // this.myTeamId = user.team;
  }

  ngOnInit() {
    this.details.leagueId = this.route.snapshot.paramMap.get('id') ?? "-1";

    if (this.details.leagueId == "-1") {
      this.isMain = true;
      this.LoadLeagues();
    }
    else {
      this.isMain = false;
      this.LoadLeagueRank(Number(this.details.leagueId));
    }
  }

  LoadLeagues() {
    this.adminService
      .getAllLeagues()
      .subscribe(
        (r) => {
          this.leagues = r;
        }
      )
  }

  LoadLeagueRank(id: number) {
    this.adminService.getRanking(id)
      .subscribe(
        (r: any) => {
          this.details.league = r.league;
          this.details.rank = (r.rank as Array<any>)
            .sort((a, b) => b.Rank - a.Rank);
          console.log(r)
        })
  }

  confirmJoin(id: number) {
    this.adminService
      .confirmJoin({ rankId: id })
      .subscribe(
        (r: any) => {
          this.LoadLeagueRank(this.details.leagueId)
          alert(r.message)
        }
      )
  }

  clearDate(e: string) {
    if (e != undefined)
      return e.split("T")[0];
    return ""
  }
}
