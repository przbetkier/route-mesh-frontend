import { Component, Input, OnInit } from '@angular/core';
import {ImpassableObject} from '../../../../models/route-model';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {
  @Input() objectList: ImpassableObject;

  constructor() { }

  ngOnInit() {
  }

}