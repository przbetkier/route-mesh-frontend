import { Component, OnInit } from '@angular/core';
import {RestpointService} from '../../../services/restpoint.service';
import {RestpointResponse} from '../../../models/restpoint-response';

@Component({
  selector: 'app-restpoint',
  templateUrl: './restpoint.component.html',
  styleUrls: ['./restpoint.component.css']
})
export class RestpointComponent implements OnInit {

  restpoints: RestpointResponse[] = [];
  loading = true;

  showRestpointMapIds = [];

  constructor(private restpointService: RestpointService) {
  }

  public customTheme = [
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "stylers": [
            {
                "saturation": 10
            },
            {
                "lightness": 77
            },
            {
                "gamma": 1.15
            }
        ]
    },
    {
        "elementType": "labels",
        "stylers": [
            {
                "gamma": 0.5
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "lightness": 0
            },
            {
                "saturation": 0
            },
            {
                "hue": "#ffffff"
            },
            {
                "gamma": 0
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": -10
            },
            {
                "saturation": 0
            },
            {
                "hue": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -5000
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    }
]

  ngOnInit() {
    this.restpointService.getRestpoints().subscribe(restpoints => {
      this.restpoints = restpoints;
      this.loading = false;
    });
  }

  toggle(id: number) {
    if (this.shouldShowRestpointMap(id)) {
      this.showRestpointMapIds = this.showRestpointMapIds.filter(rid => rid !== id);
    } else {

      this.showRestpointMapIds.push(id);
    }
  }

  shouldShowRestpointMap(id: number): boolean {
    return this.showRestpointMapIds.filter(rid => rid === id).length > 0;
  }

  deleteRestpoint(id: number) {
    this.restpointService.deleteRestpoint(id).subscribe(() => {
        this.restpoints = this.restpoints.filter(r => r.id !== id);
      }, error => {
        console.error(`Could not remove restpoint, error: ${error}!`);
      }
    );
  }
}
