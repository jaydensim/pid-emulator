import { statusContents, colours } from "../statics";
import { uEl } from "../utils";

export default class UiAppPanelDriver {
  el: {
    status: HTMLLabelElement;
    progress: HTMLProgressElement;
  };

  status = "app:loading";

  constructor() {
    this.el = {
      status: uEl<HTMLLabelElement>("app:status"),
      progress: uEl<HTMLProgressElement>("app:progress"),
    };
  }

  setStatus(status: keyof typeof statusContents) {
    this.status = status;
    this.el.status.textContent = statusContents[status];
  }

  setProgress(progress: number, colour: keyof typeof colours) {
    this.el.progress.style.accentColor = colours[colour];
    if (progress < 0) this.el.progress.removeAttribute("value");
    else this.el.progress.value = progress;
  }
}
