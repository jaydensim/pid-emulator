import { StpDefinition } from "../patterns/stoppingPatterns";
import { uEl } from "../utils";

export default class UiStoppingPatternPanelDriver {
  el: {
    PatternSelector: HTMLSelectElement;
    PatternList: HTMLDivElement;
  };

  currentPid = "";
  currentPattern: StpDefinition | undefined;

  Categories = new Map<string, string[]>();
  Patterns = new Map<string, [string, string, string[], StpDefinition]>();

  constructor() {
    this.el = {
      PatternSelector: uEl<HTMLSelectElement>("stopping:pattern-selector"),
      PatternList: uEl<HTMLDivElement>("stopping:pattern-list"),
    };
  }

  addPatternOption(
    id: string,
    name: string,
    line: string,
    supportedPids: string[],
    def: StpDefinition
  ) {
    if (this.Categories.has(line)) {
      if (!this.Categories.get(line)?.includes(id)) {
        this.Categories.get(line)?.push(id);
      }
    } else {
      this.Categories.set(line, [id]);
    }
    this.Patterns.set(id, [id, name, supportedPids, def]);
  }

  updatePattern() {
    this.el.PatternSelector.innerHTML = "";
    for (const [line, ids] of this.Categories) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = line;

      for (const id of ids) {
        const [_, name, supportedPids] = this.Patterns.get(id) as [
          string,
          string,
          string[],
          StpDefinition
        ];

        if (supportedPids.includes(this.currentPid)) {
          const option = document.createElement("option");
          option.value = id;
          option.textContent = name;
          optGroup.appendChild(option);
        }
      }

      if (optGroup.childElementCount > 0) {
        this.el.PatternSelector.appendChild(optGroup);
      }
    }
  }

  renderPattern() {
    this.el.PatternList.innerHTML = "";
    if (!this.currentPattern) return;
    for (const stop of this.currentPattern.stops) {
      const li = document.createElement("li");
      li.textContent = stop.name;
      this.el.PatternList.appendChild(li);
    }
  }

  updateCurrentPidID(id: string) {
    this.currentPid = id;
    this.updatePattern();

    console.log("updateCurrentPidID", id);
  }

  addPatternChangeListener(callback: (pidId: string) => void) {
    this.el.PatternSelector.addEventListener("change", () => {
      const p = this.Patterns.get(this.el.PatternSelector.value);
      this.currentPattern = p ? p[3] : undefined;
      this.renderPattern();
      callback(this.el.PatternSelector.value);
    });
    this.renderPattern();
    callback(this.el.PatternSelector.value);
  }
}
