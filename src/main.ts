import { PidDriver, PidSetupInfo, UninitPidDriver } from "./pids/pid";
import "./style.css";
import UiAppPanelDriver from "./ui/uiAppPanelDriver";
import uiTrainsetConfigPanelDriver from "./ui/uiTrainsetConfigPanelDriver";
import {
  pidsAsync as PidsAsyncList,
  stopsAsync as StoppingPatternsAsyncList,
} from "./modules";
import UiRstatsPanelDriver from "./ui/uiRstatsPanelDriver";
import UiStoppingPatternPanelDriver from "./ui/uiStoppingPatternPanelDriver";
import { StpDefinition } from "./patterns/stoppingPatterns";

class Main {
  UiAppPanel = new UiAppPanelDriver();
  UiTrainsetConfigPanel = new uiTrainsetConfigPanelDriver();
  UiStoppingPatternPanelDriver = new UiStoppingPatternPanelDriver();
  UiRstatsPanel = new UiRstatsPanelDriver();

  pids = new Map<string, UninitPidDriver>();
  patterns = new Map<string, StpDefinition>();

  currentPid: PidDriver | undefined = undefined;

  currentPattern: StpDefinition | undefined = undefined;

  constructor() {
    this.UiAppPanel.setProgress(1, "yellow");
    this.UiAppPanel.setStatus("app:loading");

    this.finishSetup();
  }

  async finishSetup() {
    await this.registerPids();

    this.UiAppPanel.setProgress(2, "yellow");

    await this.registerStoppingPatterns();

    this.UiAppPanel.setProgress(3, "yellow");

    this.UiTrainsetConfigPanel.addPidOptionChangeListener((pidId: string) => {
      this.UiStoppingPatternPanelDriver.updateCurrentPidID(pidId);
      this.initPidDriver(pidId);
    });

    this.UiStoppingPatternPanelDriver.addPatternChangeListener(
      (patternId: string) => {
        this.updateStoppingPattern(patternId);
      }
    );

    this.UiAppPanel.setStatus("app:ready");
    this.UiAppPanel.setProgress(4, "green");
  }

  async registerPids() {
    const pids = await PidsAsyncList();

    for (const trainset of pids) {
      const tsModule = (await trainset) as { default: PidSetupInfo };
      const ts = tsModule.default;
      for (const pid of ts.variants) {
        this.pids.set(pid.id, pid.pidClass);
        this.UiTrainsetConfigPanel.addPidOption(
          ts.category,
          ts.name,
          pid.name,
          pid.id
        );
      }
    }
    this.UiTrainsetConfigPanel.updateTrainsetList();
  }

  async registerStoppingPatterns() {
    const patterns = await StoppingPatternsAsyncList();
    for (const patternModule of patterns) {
      const pattern = await patternModule;
      this.UiStoppingPatternPanelDriver.addPatternOption(
        pattern.default.id,
        pattern.default.name,
        pattern.default.line,
        pattern.default.supportedPids
      );
      this.patterns.set(pattern.default.id, pattern.default);
    }
    this.UiStoppingPatternPanelDriver.updatePattern();
  }

  updateStoppingPattern(patternId: string) {
    this.currentPattern = this.patterns.get(patternId);
    console.log("updateStoppingPattern", this.currentPattern);
  }

  initPidDriver(pidID: string) {
    if (this.currentPid) {
      this.currentPid.teardown();
    }
    this.currentPid = new (this.pids.get(pidID) as UninitPidDriver)({
      measurementSink: {
        createMeasurement: (...args) => {
          this.UiRstatsPanel.createMeasurement(...args);
        },
        reportMeasurement: (...args) => {
          this.UiRstatsPanel.reportMeasurement(...args);
        },
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  new Main();
});
