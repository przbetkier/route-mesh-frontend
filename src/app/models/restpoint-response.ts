export class RestpointResponse {
    constructor(public id: number,
                public node: RestpointNode,
                public restpointType: string,
                public roadNumber: string,
                public milestone: number,
                public generalSlots: number,
                public occupancy: number,
                public slotLength: number,
                public hazardousSlots: number,
                public oversizeLength: number,
                public oversizeWidth: number,
                public security: boolean,
                public cctv: boolean,
                public barriers: boolean,
                public lighting: boolean) {
    }
  }
  
  export class RestpointNode {
    constructor(public name: string,
                public latitude: number,
                public longitude: number) {
    }
  }