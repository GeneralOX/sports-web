import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  screen: any = {
    view: 1,

    matchId: -1,
    matches: []
  }

  constructor(private webSerivce: WebService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.screen.matchId = this.route.snapshot.paramMap.get('id') ?? "-1";
    if (this.screen.matchId == "-1") {
      this.screen.view = 1;
      this.webSerivce.getAllMatches().subscribe((_res) => {
        this.screen.matches = _res;
      })
    }
    else {
      this.screen.view = 2;
      this.webSerivce.getMatchDetails(this.screen.matchId)
        .subscribe(
          (_res) => {
            this.screen.match = _res;
          })
    }
  }

  clearDate(e: string) {
    return e.split("T")[0];
  }
}
