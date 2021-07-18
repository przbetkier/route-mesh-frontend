import {Component, OnInit} from '@angular/core';
import {ObstacleService} from '../../services/obstacle.service';
import {Obstacle} from '../../models/obstacle';
import {ObstacleDetailsComponent} from '../roads/single-road/obstacle/obstacle-details/obstacle-details.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-obstacles',
  templateUrl: './obstacles.component.html',
  styleUrls: ['./obstacles.component.css']
})
export class ObstaclesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private obstacleService: ObstacleService,
              private snackBar: MatSnackBar) {
  }

  obstacles: Obstacle[];

  ngOnInit() {
    this.loadObstacles();
  }

  showObstacleDetails(obstacleId: number) {
    this.dialog.open(ObstacleDetailsComponent, {
      width: '60vw',
      data: {id: obstacleId},
      panelClass: 'custom-modalbox'
    });
  }

  private loadObstacles() {
    this.obstacleService.getAll()
      .subscribe(ob => this.obstacles = ob);
  }

  deleteObstacle(id: number) {
    this.obstacleService.deleteObstacle(id)
      .subscribe(
        () => {
          this.snackBar.open(`Removed obstacle ${id}`, 'OK', {duration: 2000});
          this.loadObstacles();
        }
      );
  }
}
