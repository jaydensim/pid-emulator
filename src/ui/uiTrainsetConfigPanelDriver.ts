import { uEl } from "../utils";

export default class uiTrainsetConfigPanelDriver {
  el: {
    selectorTS: HTMLSelectElement;
    selectorPID: HTMLSelectElement;
  };

  Trainsets = new Map<string, string[]>();
  Pids = new Map<string, [string, string]>();

  constructor() {
    this.el = {
      selectorTS: uEl<HTMLSelectElement>("tsconfig:ts-selector"),
      selectorPID: uEl<HTMLSelectElement>("tsconfig:pid-selector"),
    };

    this.el.selectorTS.addEventListener("change", () => {
      this.updatePidList();
    });
  }

  addPidOption(
    tsCategory: string,
    tsName: string,
    pidName: string,
    pidId: string
  ) {
    if (this.Trainsets.has(tsCategory)) {
      if (!this.Trainsets.get(tsCategory)?.includes(tsName)) {
        this.Trainsets.get(tsCategory)?.push(tsName);
      }
    } else {
      this.Trainsets.set(tsCategory, [tsName]);
    }
    this.Pids.set(pidId, [tsName, pidName]);
  }

  updateTrainsetList() {
    this.el.selectorTS.innerHTML = "";
    for (const [category, names] of this.Trainsets) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = category;
      this.el.selectorTS.appendChild(optGroup);

      for (const name of names) {
        const option = document.createElement("option");
        option.value = btoa(name);
        option.textContent = name;
        optGroup.appendChild(option);
      }
    }
    this.updatePidList();
  }

  updatePidList() {
    this.el.selectorPID.innerHTML = "";
    const selectedTS = atob(this.el.selectorTS.value);
    for (const [pidId, [tsName, pidName]] of this.Pids) {
      if (tsName === selectedTS) {
        const option = document.createElement("option");
        option.value = pidId;
        option.textContent = pidName;
        this.el.selectorPID.appendChild(option);
      }
    }
  }

  addPidOptionChangeListener(callback: (pidId: string) => void) {
    this.el.selectorPID.addEventListener("change", () => {
      callback(this.el.selectorPID.value);
    });
    callback(this.el.selectorPID.value);
  }
}
