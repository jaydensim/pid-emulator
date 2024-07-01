import { uEl } from "../utils";

interface MesDef {
  name: string;
  type: string;
  values: number[];
  htmlElement: HTMLInputElement;
}

export default class UiRstatsPanelDriver {
  el: {
    measurements: HTMLDivElement;
  };

  measurements = new Map<string, MesDef>();

  constructor() {
    this.el = {
      measurements: uEl<HTMLDivElement>("rstats:measurements"),
    };

    setInterval(() => {
      this.updateStats();
    }, 250);
  }

  createMeasurement(name: string, type: string) {
    if (this.measurements.has(name)) {
      this.measurements.set(name, {
        name,
        type,
        htmlElement: this.measurements.get(name)
          ?.htmlElement as HTMLInputElement,
        values: [],
      });
    } else {
      const el = document.createElement("div");
      const input = document.createElement("input");
      const label = document.createElement("label");

      el.classList.add("itable-row");
      input.type = "text";
      input.readOnly = true;
      input.id = `rstats:measurement:${name}`;
      label.htmlFor = input.id;
      label.textContent = name;

      el.appendChild(label);
      el.appendChild(input);

      this.el.measurements.appendChild(el);

      this.measurements.set(name, {
        name,
        type,
        values: [],
        htmlElement: input,
      });
    }
  }

  reportMeasurement(name: string, value: number) {
    if (this.measurements.get(name) !== undefined) {
      this.measurements.get(name)?.values.push(value);
      if (
        (this.measurements.get(name) as MesDef).type == "sliding" &&
        (this.measurements.get(name) as MesDef).values.length > 100
      ) {
        this.measurements.get(name)?.values.shift();
      }
      this.updateStat(this.measurements.get(name) as any);
    }
  }

  updateStat(mes: MesDef) {
    if (mes.type === "average" || mes.type == "sliding") {
      const avg = mes.values.reduce((a, b) => a + b, 0) / mes.values.length;
      mes.htmlElement.value = `${Number(avg).toFixed(3)}`;
    } else if (mes.type === "sum") {
      mes.htmlElement.value = String(mes.values.reduce((a, b) => a + b, 0));
    }
  }

  updateStats() {
    for (const mes of this.measurements.values()) {
      this.updateStat(mes);
    }
  }
}
