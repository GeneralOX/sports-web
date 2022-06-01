import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {

  league: any = {};
  rank: any[] = [];
  constructor(private webSerivce: WebService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let leagueId = this.route.snapshot.paramMap.get('id');

    if (leagueId != null) {
      this.loadLeagueRank(leagueId);
    }
  }

  loadLeagueRank(id: any) {
    this.webSerivce.getLeagueRank(id).subscribe(
      (r: any) => {
        this.league = (r.league)
        this.rank = (r.rank as [])

          .filter((v: any, i) => v.status)
          .sort((a, b) => a - b)
      }
    )
  }

}
