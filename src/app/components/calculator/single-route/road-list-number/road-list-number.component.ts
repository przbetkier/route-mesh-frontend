import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-road-list-number',
  templateUrl: './road-list-number.component.html',
  styleUrls: ['./road-list-number.component.css']
})
export class RoadListNumberComponent implements OnInit {

  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}