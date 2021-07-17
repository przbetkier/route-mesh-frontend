import { Component, Input, OnInit } from '@angular/core';
import {RoadFromRoute} from '../../../../models/route-model';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  @Input() routeList: RoadFromRoute;

  constructor() { }

  ngOnInit() {
  }

}
