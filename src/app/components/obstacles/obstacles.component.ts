import {Component, OnInit} from '@angular/core';
import {ObstacleService} from '../../services/obstacle.service';
import {Obstacle} from '../../models/obstacle';
import {ObstacleDetailsComponent} from '../roads/single-road/obstacle/obstacle-details/obstacle-details.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-obstacles',
  templateUrl: './obstacles.component.html',
  styleUrls: ['./obstacles.component.css']
})
export class ObstaclesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private obstacleService: ObstacleService) {
  }

  obstacles: Obstacle[];

  ngOnInit() {
    this.obstacleService.getAll()
      .subscribe(ob => this.obstacles = ob);
  }

  showObstacleDetails(obstacleId: number) {
    this.dialog.open(ObstacleDetailsComponent, {
      width: '60vw',
      data: {id: obstacleId},
      panelClass: 'custom-modalbox'
    });
  }

}
