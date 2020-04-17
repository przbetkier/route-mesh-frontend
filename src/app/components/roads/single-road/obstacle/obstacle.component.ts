import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ObstacleService} from '../../../../services/obstacle.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SimpleObstacle} from '../../../../models/road-model';
import {ObstacleDetailsComponent} from './obstacle-details/obstacle-details.component';

@Component({
  selector: 'app-obstacle',
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.css']
})
export class ObstacleComponent implements OnInit {

  @Input() obstacles: SimpleObstacle[];
  @Output() obstacleRemoved = new EventEmitter<number>();

  constructor(public dialog: MatDialog, private obstacleService: ObstacleService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  showObstacleDetails(obstacleId: number) {
    this.dialog.open(ObstacleDetailsComponent, {
      width: '60vw',
      data: {id: obstacleId},
      panelClass: 'custom-modalbox'
    });
  }

  deleteObstacle(id: number) {
    this.obstacleService.deleteObstacle(id)
      .subscribe(
        () => {
          this.snackBar.open(`Removed obstacle ${id}`, 'OK', {duration: 2000});
          this.obstacleRemoved.emit(id);
        }
      );
  }
}
