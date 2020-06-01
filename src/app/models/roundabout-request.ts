export class RoundaboutRequest {
  constructor(public nodeId: number,
              public innerDiameter: number,
              public outerDiameter: number,
              public exitRequests: ExitRequest[]) {
  }
}

export class ExitRequest {
  constructor(
    public roadId: number,
    public startAngle: number,
    public endAngle: number) {
  }
}
