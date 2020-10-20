export class Obstructions {
  constructor(public height: HeightObstruction,
              public weight: WeightObstruction,
              public width: WidthObstruction,
              public elevation: ElevationObstruction,
              public curvature: CurvatureObstruction) {
  }
}

export class HeightObstruction {
  constructor(public limit: number,
              public profile: number,
              public range: number,
              public subtype: string) {
  }
}

export class WeightObstruction {
  constructor(public limit: number,
              public mlc: number,
              public subtype: string) {
  }
}

export class WidthObstruction {
  constructor(public limits: number[],
              public ranges: number[],
              public symmetric: boolean,
              public subtype: string) {
  }
}

export class ElevationObstruction {
  constructor(public verticalCurveRadius: number) {
  }
}

export class CurvatureObstruction {
  constructor(public innerRadius: number,
              public outerRadius: number,
              public boundaryRadius: number) {
  }
}
