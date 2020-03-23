import {Obstructions} from './obstructions-model';

export class Obstacle {
  constructor(public id: number,
              public name: string,
              public city: string,
              public comment: string,
              public immovable: boolean,
              public milestone: number,
              public latitude: number,
              public longitude: number,
              public obstructions: Obstructions) {
  }
}
