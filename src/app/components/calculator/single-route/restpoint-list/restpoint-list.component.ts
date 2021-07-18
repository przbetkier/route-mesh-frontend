import { Component, Input, OnInit } from '@angular/core';
import {Restpoint} from '../../../../models/route-model';

@Component({
  selector: 'app-restpoint-list',
  templateUrl: './restpoint-list.component.html',
  styleUrls: ['./restpoint-list.component.css']
})
export class RestpointListComponent implements OnInit {
  @Input() restpointList: Restpoint;

  constructor() { }

  ngOnInit() {
  }

}
