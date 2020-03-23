export class Obstructions {
  constructor(public height: HeightObstruction) {
  }
}

export class HeightObstruction {
  constructor(public type: string,
              public limit: number,
              public profile: number,
              public range: number,
              public subtype: string) {
  }
}
