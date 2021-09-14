import { Component, Input, OnInit } from '@angular/core';
import {ImpassableRoundabout} from '../../../../models/route-model';

@Component({
  selector: 'app-roundabout-list',
  templateUrl: './roundabout-list.component.html',
  styleUrls: ['./roundabout-list.component.css']
})
export class RoundaboutListComponent implements OnInit {
  @Input() roundaboutList: ImpassableRoundabout[];

  constructor() { }

  ngOnInit() {
  }

}
