import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
    this.adminService.loadTerrains()
      .subscribe(
        (r) => {
          this.terrains = r;
        }
      )
  }

  terrains: any[] = [];
  addName: string = "";


  addTerrain() {
    this.adminService.addTerain({ name: this.addName })
      .subscribe(
        (r) => {
          this.terrains.push(r);
          this.addName = "";
        }
      )
  }

  deleteTerrain(id: number) {
    let confirmAction = confirm("You sure you want to delete this terrain ?");
    if (confirmAction) {
      this.adminService.deleteTerrain(id)
        .subscribe(
          (r: any) => {
            this.terrains = this.terrains.filter((c) => c.id != id);
          }
        )
    }
  }

}
