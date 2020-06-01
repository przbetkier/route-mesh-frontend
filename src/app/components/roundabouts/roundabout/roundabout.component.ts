import {Component, OnInit} from '@angular/core';
import {RoundaboutService} from '../../../services/roundabout.service';
import {RoundaboutResponse} from '../../../models/roundabout-response';

@Component({
  selector: 'app-roundabout',
  templateUrl: './roundabout.component.html',
  styleUrls: ['./roundabout.component.css']
})
export class RoundaboutComponent implements OnInit {

  roundabouts: RoundaboutResponse[] = [];
  loading = true;

  showRoundaboutMapIds = [];

  constructor(private roundaboutService: RoundaboutService) {
  }

  ngOnInit() {
    this.roundaboutService.getRoundabouts().subscribe(roundabouts => {
      this.roundabouts = roundabouts;
      this.loading = false;
    });
  }

  toggle(id: number) {
    if (this.shouldShowRoundaboutMap(id)) {
      this.showRoundaboutMapIds = this.showRoundaboutMapIds.filter(rid => rid !== id);
    } else {

      this.showRoundaboutMapIds.push(id);
    }
  }

  shouldShowRoundaboutMap(id: number): boolean {
    return this.showRoundaboutMapIds.filter(rid => rid === id).length > 0;
  }

  deleteRoundabout(id: number) {
    this.roundaboutService.deleteRoundabout(id).subscribe(() => {
        this.roundabouts = this.roundabouts.filter(r => r.id !== id);
      }, error => {
        console.error(`Could not remove roundabout, error: ${error}!`);
      }
    );
  }
}
