import { PidSetupInfo, PidCanvasDriver, PidBaseClassReqs } from "./pid";

class SydtAVer1 extends PidCanvasDriver {
  constructor(reqs: PidBaseClassReqs) {
    super(reqs);
    this.setCanvasSize(0, 0);
  }
}

const exportable: PidSetupInfo = {
  category: "Sydney Trains",
  name: "B Set - Waratah Series 2",
  variants: [
    {
      id: "sydt-b-ver1",
      name: "Original 2019 PID",
      pidClass: SydtAVer1,
    },
    {
      id: "sydt-b-ver2",
      name: "2021 PID Update",
      pidClass: SydtAVer1,
    },
  ],
};

export default exportable;
