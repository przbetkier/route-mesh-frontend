export class RoundaboutResponse {
  constructor(public id: number,
              public node: RoundaboutNode,
              public innerDiameter: number,
              public outerDiameter: number,
              public roundaboutExits: RoundaboutExit[]) {
  }
}

export class RoundaboutExit {
  constructor(public roadId: number,
              public roadName: string,
              public startAngle: number,
              public endAngle: number) {
  }
}

export class RoundaboutNode {
  constructor(public name: string,
              public latitude: number,
              public longitude: number) {
  }
}
