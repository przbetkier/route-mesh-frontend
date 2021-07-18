export class RestpointRequest {
    constructor(public nodeId: number,
                public restpointType: string,
                public roadNumber: string,
                public milestone: number,
                public generalSlots: number,
                public occupancy: number,
                public slotLength: number,
                public slotWidth: number,
                public hazardousSlots: number,
                public oversizeLength: number,
                public oversizeWidth: number,
                public security: boolean,
                public cctv: boolean,
                public barriers: boolean,
                public lighting: boolean
                ) {
    }
  }
  
