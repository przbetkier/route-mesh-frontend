import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Road} from '../../../../models/road-model';
import {Admin} from '../../../../models/admin-model';
import {ObstacleService} from '../../../../services/obstacle.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-obstacle',
  templateUrl: './obstacle.component.html',
  styleUrls: ['./obstacle.component.css']
})
export class ObstacleComponent implements OnInit {

  @Input() road: Road;

  @Output() obstacleRemoved = new EventEmitter<number>();

  constructor(private obstacleService: ObstacleService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  deleteObstacle(id: number) {
    this.obstacleService.deleteObstacle(id).subscribe(
      () => {
        this.snackBar.open(`Removed obstacle ${id}`, 'OK', {
          duration: 2000,
        });
        this.obstacleRemoved.emit(id);
      }
    );
  }

}
