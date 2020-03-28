import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ObstacleService} from '../../../../../services/obstacle.service';
import {Obstacle} from '../../../../../models/obstacle';

export interface ObstacleDetailsDialogData {
  id: number;
}

@Component({
  selector: 'app-obstacle-details',
  templateUrl: './obstacle-details.component.html',
  styleUrls: ['./obstacle-details.component.css']
})
export class ObstacleDetailsComponent implements OnInit {

  obstacle: Obstacle;
  loading = true;
  hasErrors = false;

  constructor(public dialogRef: MatDialogRef<ObstacleDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ObstacleDetailsDialogData,
              private obstacleService: ObstacleService) {
  }

  ngOnInit() {
    this.obstacleService.getObstacle(this.data.id).subscribe(
      obs => {
        this.obstacle = obs;
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.hasErrors = true;
      }
    );
  }
}
