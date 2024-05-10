export interface Plans { 
    id: Number,
    name: string,
    createdAt: Date,

    product: string,
    price: number,

    pickingList: boolean, 
    waveSeparation: boolean, 
    separationRoute: boolean, 
    orderConference: boolean, 
    volumeControl: boolean, 
    labelPrinting: boolean, 
    labelReprint: boolean
}

export interface PlansFields {
    name: string,

    price: number | null,
    product: any,

    pickingList: boolean, 
    waveSeparation: boolean, 
    separationRoute: boolean, 
    orderConference: boolean, 
    volumeControl: boolean, 
    labelPrinting: boolean, 
    labelReprint: boolean
}