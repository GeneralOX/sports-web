import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  constructor(private route: ActivatedRoute) {

  }
  name: string = "";
  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('id') ?? "-1";
    console.log(this.name)
  }

}
