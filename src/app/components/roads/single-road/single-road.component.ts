import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Road} from '../../../models/road-model';
import {RoadsService} from '../../../services/roads.service';

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

  constructor(private roadService: RoadsService) {
  }

  ngOnInit() {
    this.getDirection();
  }

  deleteRoad(roadId: number) {
    this.roadService.deleteRoad(roadId).subscribe(() => {
      this.onRoadRemove.emit(roadId);
    });
  }

  showMap() {
    this.shouldShowMap = true;
  }

  getDirection() {
    this.origin = {lat: this.road.startNode.latitude, lng: this.road.startNode.longitude};
    this.destination = {lat: this.road.endNode.latitude, lng: this.road.endNode.longitude};
  }
}
