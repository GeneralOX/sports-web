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
  constructor(private adminService: AdminService, private route: ActivatedRoute) { }
  ngOnInit() {
    let leagueId = this.route.snapshot.paramMap.get('id');
    this.isMain = (leagueId == null);

    if (this.isMain)
      this.LoadLeagues();
    else
      this.LoadLeagueRank(Number(leagueId));
  }

  // MAIN
  openModel = false;
  leagues: any = [];
  addLeagueForm: any = {};

  addLeague() {
    this.adminService.addLeague(this.addLeagueForm)
      .subscribe(
        (r) => {
          this.leagues.push(r);
          this.openModel = false;
        }
      )
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

  // League Details
  LeagueInfo: any = {};
  ActiveLeague: any = [];
  PendingLeague: any = [];

  LoadLeagueRank(id: number) {
    this.adminService.getRanking(id)
      .subscribe(
        (r: any) => {
          this.LeagueInfo = r.league;

          this.ActiveLeague = (r.rank as Array<any>)
            .filter((v) => v.status)
            .sort((a, b) => b.Rank - a.Rank);

          this.PendingLeague = (r.rank as Array<any>)
            .filter((v) => !v.status)
            .sort((a, b) => b.Rank - a.Rank);
        })
  }

  confirmJoin(id: number) {
    this.adminService
      .confirmJoin({ rankId: id })
      .subscribe(
        (r: any) => {
          this.LoadLeagueRank(id)
          alert(r.message)
        }
      )
  }
  blockTeam(id: number) {
    this.adminService
      .blockTeam({ rankId: id })
      .subscribe(
        (r: any) => {
          this.LoadLeagueRank(id)
          alert(r.message)
        }
      )
  }

  // FUNC
  clearDate(e: string) {
    if (e != undefined)
      return e.split("T")[0];
    return ""
  }
}
