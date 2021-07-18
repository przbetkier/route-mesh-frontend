import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Route} from '../../../models/route-model';
import {RouteService} from '../../../services/route.service';
import {MatDialog} from '@angular/material';
import {RoadFromRoute} from '../../../models/route-model';

@Component({
  selector: 'app-single-route',
  templateUrl: './single-route.component.html',
  styleUrls: ['./single-route.component.css']
})
export class SingleRouteComponent implements OnInit {

  @Input()
  route: Route;

  @Output() onRoadRemove = new EventEmitter<number>();

  shouldShowMap = false;
  public rows: RoadFromRoute[] = [];

  public renderOptions = {
    suppressMarkers: true,
}

  public nodeIcon = { url: 'https://static.wixstatic.com/media/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png/v1/fill/w_614,h_614,fp_0.50_0.50,lg_1/2cd43b_73cacdc0c2434cfe8a83b5bca295e440~mv2.png', scaledSize: {height: 40, width: 40}}
  public restIcon = { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/AS-parking-icon.svg/1024px-AS-parking-icon.svg.png', scaledSize: {height: 35, width: 35}}
  public objectIcon = { url: '../../../../assets/icons/fence.png', scaledSize: {height: 35, width: 35}}
  public weatherIcon = { url: '../../../../assets/icons/slip.png', scaledSize: {height: 35, width: 58}}
  public weatherBlank = { url: '../../../../assets/icons/slip.png', scaledSize: {height: 35, width: 58}, opacity : 0}

  public nodeOptions = {
    origin: {
      icon: this.nodeIcon
    },
    destination: {
      icon: this.nodeIcon
    }
}

  constructor(public dialog: MatDialog, private routeService: RouteService) {
  }

  ngOnInit() {
  }

  changeShouldShowMap() {
    this.shouldShowMap = !this.shouldShowMap;
    if (this.shouldShowMap) {
      this.rows = [];
      this.route.roadRows.forEach(
        (r, i) => {
          setTimeout(() => {
            this.rows.push(r);
          }, 2000 * i);
        }
      );
    }
  }
}