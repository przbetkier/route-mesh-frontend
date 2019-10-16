import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-road-number',
  templateUrl: './road-number.component.html',
  styleUrls: ['./road-number.component.css']
})
export class RoadNumberComponent implements OnInit {

  @Input() number: number;

  constructor() {
  }

  ngOnInit() {
  }

}
