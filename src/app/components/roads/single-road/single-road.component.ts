import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Road} from '../../../models/road-model';
import {RoadsService} from '../../../services/roads.service';
import {MatDialog} from '@angular/material';
import {NewObstacleDialogComponent} from './obstacle/new-obstacle-dialog/new-obstacle-dialog.component';
import {NewRestpointDialogComponent} from './restpoint/new-restpoint-dialog/new-restpoint-dialog.component';

@Component({
  selector: 'app-single-road',
  templateUrl: './single-road.component.html',
  styleUrls: ['./single-road.component.css']
})
export class SingleRoadComponent implements OnInit {

  public lat: number;
  public lng: number;
  public origin: any;
  public destination: any;

  @Input()
  road: Road;

  @Output() onRoadRemove = new EventEmitter<number>();

  shouldShowMap = false;

  constructor(public dialog: MatDialog, private roadService: RoadsService) {
  }

  ngOnInit() {
    this.getDirection();
  }

  deleteRoad(roadId: number) {
    this.roadService.deleteRoad(roadId).subscribe(() => {
      this.onRoadRemove.emit(roadId);
    });
  }

  changeShouldShowMap() {
    this.shouldShowMap = !this.shouldShowMap;
  }

  getDirection() {
    this.origin = {lat: this.road.startNode.latitude, lng: this.road.startNode.longitude};
    this.destination = {lat: this.road.endNode.latitude, lng: this.road.endNode.longitude};
  }

  addNewObstacle() {
    this.dialog.open(NewObstacleDialogComponent, {
      width: '60vw',
      data: {roadId: this.road.id, roadName: this.road.name},
      panelClass: 'custom-modalbox'
    });
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.reload();
      }
    );
  }

  addNewRestPoint() {
    this.dialog.open(NewRestpointDialogComponent, {
      width: '60vw',
      data: {roadId: this.road.id, roadName: this.road.name},
      panelClass: 'custom-modalbox'
    });
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.reload();
      }
    );
  }

  reload() {
    this.roadService.getRoad(this.road.id)
      .subscribe(r => this.road = r);
  }
}
