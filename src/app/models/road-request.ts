export class RoadRequest {
  constructor(public name: string,
              public startNode: number,
              public endNode: number,
              public direction: string,
              public type: string,
              public numbers: string[],
              public kmRange: number[],
              public lines: number,
              public maxAxleLoad: number,
              public admins: number[],
              public width: number) {
  }
}
