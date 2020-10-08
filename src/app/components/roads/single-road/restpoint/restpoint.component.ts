import {Component, Input, OnInit} from '@angular/core';
import {RestPoint} from '../../../../models/road-model';

@Component({
  selector: 'app-restpoint',
  templateUrl: './restpoint.component.html',
  styleUrls: ['./restpoint.component.css']
})
export class RestpointComponent implements OnInit {

  @Input() restPoints: RestPoint[];

  constructor() { }

  ngOnInit() {
  }

}
