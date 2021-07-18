import {Component, OnInit} from '@angular/core';
import {NodeService} from '../../services/node.service';
import {Node} from '../../models/node-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css']
})
export class NodesComponent implements OnInit {

  nodes: Node[] = [];
  loading = true;

  filteredNodes: Node[] = [];

  constructor(private nodeService: NodeService, private router: Router) {
  }

  public nodesTheme = [
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
    this.nodeService.getNodes().subscribe(nodes => {
      this.nodes = nodes;
      this.filteredNodes = nodes;
      this.loading = false;
    });
  }

  createRoundabout(nodeId: number) {
    this.router.navigateByUrl(`/roundabout-form/${nodeId}`);
  }

  createRestpoint(nodeId: number) {
    this.router.navigateByUrl(`/restpoint-form/${nodeId}`);
  }

  changeType(type: string) {
    this.loading = true;
    if (type === 'ALL') {
      this.filteredNodes = this.nodes;
    } else {
      this.filteredNodes = this.nodes.filter(n => n.type === type);
    }
    this.loading = false;
  }
}


