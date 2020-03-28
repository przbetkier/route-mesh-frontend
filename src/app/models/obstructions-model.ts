export class Obstructions {
  constructor(public height: HeightObstruction,
              public weight: WeightObstruction) {
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
