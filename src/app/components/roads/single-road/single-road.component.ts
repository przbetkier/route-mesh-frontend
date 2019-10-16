import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Road} from '../../../models/road-model';
import {RoadsService} from '../../../services/roads.service';

@Component({
  selector: 'app-single-road',
  templateUrl: './single-road.component.html',
  styleUrls: ['./single-road.component.css']
})
export class SingleRoadComponent implements OnInit {

  @Input()
  road: Road;

  @Output() onRoadRemove = new EventEmitter<number>();

  constructor(private roadService: RoadsService) {
  }

  ngOnInit() {
  }

  deleteRoad(roadId: number) {
    this.roadService.deleteRoad(roadId).subscribe(() => {
      this.onRoadRemove.emit(roadId);
    });
  }

}
