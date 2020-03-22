export class HeightObstacleRequest {
  constructor(public roadId: number,
              public name: string,
              public city: string,
              public latitude: number,
              public longitude: number,
              public immovable: boolean,
              public milestone: number,
              public url: string,
              public comment: string,
              public obstacleType: string,
              public limit: number,
              public heightProfile: number,
              public range: number,
              public heightObstacleType: string) {
  }
}
