import { PidSetupInfo } from "../pid";

import { SydtAVer1 as SvgDriver } from "./drivers/waratah-svg";
import { SydtAVer1_UsingCanvas as CanvasDriver } from "./drivers/waratah-canvas";

const exportable: PidSetupInfo = {
  category: "Sydney Trains",
  name: "A Set - Waratah Series 1",
  variants: [
    {
      id: "sydt-a-ver1",
      name: "2013 PID System",
      pidClass: SvgDriver,
    },
    {
      id: "sydt-a-ver1-canvas",
      name: "2013 PID System (Using Canvas)",
      pidClass: CanvasDriver,
    },
  ],
};

export default exportable;
