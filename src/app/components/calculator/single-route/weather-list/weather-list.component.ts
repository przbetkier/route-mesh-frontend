import { Component, Input, OnInit } from '@angular/core';
import {WeatherCords} from '../../../../models/route-model';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {
  @Input() weatherList: WeatherCords;

  constructor() { }

  ngOnInit() {
  }

}
