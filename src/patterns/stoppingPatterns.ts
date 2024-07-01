export interface StpStop {
  name: string;
  type?: "first" | "stop" | "last";
  interchange?: string[];
}

export interface StpDefinition {
  id: string;
  stops: StpStop[];
  name: string;
  supportedPids: string[];
  line: string;
}
