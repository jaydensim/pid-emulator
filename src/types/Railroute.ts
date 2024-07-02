export interface Railroute {
  id: string
  name: string
  description: string
  headsign: string[]
  line: {
    name: string
    short: string
    colour: string
    textcolour: string
  }
  stations: string[]
}
