import { NumberValueAccessor } from "@angular/forms/src/directives";

export class Routes {
  constructor(public routes: Route[]) {
  }
}

export interface Route {
  cost: number;
  length: number;
  startPoint: string;
  endPoint: string;
  roadRows: RoadFromRoute[];
  stops: Restpoint[];
  impassableObjects: ImpassableObject[];
  impassableRoundabouts: ImpassableRoundabout[];
  weather: WeatherCords[];
  timeTravel: number;
  trafficFactor: number;
  safetyIndex: number;
  weatherIndex: number;
}

export interface RoadFromRoute {
  identity: number;
  length: number;
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  name: string;
  number: string[];
  kmRange: number[];
  trafficFactor: number;
  type: string;
}

export interface Restpoint {
  milestone: number;
  name: string;
  roadNumber: string[];
  latitude: number;
  longitude: number;
  restpointType: string;
  generalSlots: number;
  occupancy: number;
  slotLength: number;
  slotWidth: number;
  hazardousSlots: number;
  oversizeLength: number;
  oversizeWidth: number;
  security: boolean;
  cctv: boolean;
  barriers: boolean;
  lighting: boolean;
}

export interface ImpassableObject {
  identity: number;
  name: string;
  milestone: number;
  number: number[];
  latitude: number;
  longitude: number;
}

export interface WeatherCords {
  midLatitude: number;
  midLongitude: number;
  kmRange : number[];
  number : number[];
  temp: number;
  pop: number;
  popIndex: number;
  isBad: boolean;
  weatherIndex: number;
  safetyIndex: number;
}

export interface ImpassableRoundabout {
  latitude: number;
  longitude: number;
  name: string;
  removalCost: number;
}