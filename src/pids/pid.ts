import { uEl } from "../utils";

export type PidDriver = PidCanvasDriver | PidBaseDriver;
export type UninitPidDriver = typeof PidCanvasDriver | typeof PidBaseDriver;

export interface MeasurementSinkDef {
  createMeasurement: (name: string, type: string) => void;
  reportMeasurement: (name: string, value: number) => void;
}

export interface PidBaseClassReqs {
  measurementSink: MeasurementSinkDef;
}

export interface PidSetupInfo {
  category: string;
  name: string;
  variants: {
    id: string;
    name: string;
    pidClass: UninitPidDriver;
  }[];
}

export class PidBaseDriver {
  injectionContainer: HTMLDivElement;

  measurementSink: MeasurementSinkDef;

  constructor(reqs: PidBaseClassReqs) {
    this.injectionContainer = uEl<HTMLDivElement>("pid:injection");
    this.injectionContainer.innerHTML = "";
    this.measurementSink = reqs.measurementSink;
  }
  teardown() {}
  stop() {}
  start() {}
}

export class PidCanvasDriver extends PidBaseDriver {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(reqs: PidBaseClassReqs) {
    super(reqs);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.injectionContainer.innerHTML = "";
    this.injectionContainer.appendChild(this.canvas);
  }

  setCanvasSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
