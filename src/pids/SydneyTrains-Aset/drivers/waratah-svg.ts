import { PidBaseDriver, PidBaseClassReqs } from "../../pid";
import { font as WaratahFont, icons as WaratahIcons } from "../support/font";
import { createLEDPanel } from "../support/display";

const statics = {
  size: [94, 17],
  backgroundColour: "202020",
  pixelColour: "E86F00",

  linePos: [0, 9],

  updateTime: 16 * 2,
};
interface RenderElement {
  type: "text" | "icon";
  flags: { line: number; align: "center" | "left" | "right" | "scroll" };
  content: any;
}
export class SydtAVer1 extends PidBaseDriver {
  running: boolean = false;
  imageData = new Array(statics.size[0] * statics.size[1]);
  SvgPixels: SVGGElement[] = new Array(statics.size[0] * statics.size[1]);
  lastUpdateTime = 0;
  lastUpdateDelta = 0;

  scrollPos = statics.linePos.map(() => statics.size[0]);
  lineWidths = statics.linePos.map(() => 0);

  timeout = setInterval(this.runScrollUpdate.bind(this), statics.updateTime);

  font = new Map<string, number[][]>(WaratahFont as any);
  icons = new Map<string, number[][]>(WaratahIcons as any);

  renderElements: RenderElement[] = [
    {
      type: "text",
      flags: { line: 0, align: "center" },
      content: ["Central"],
    },
    {
      type: "text",
      flags: { line: 1, align: "scroll" },
      content: [
        "Stopping at Central, Town Hall, Wynyard, Milsons Point, North Sydney, Waverton, Wollstonecraft, St Leonards, Artarmon, Chatswood, Roseville, Lindfield, Killara, Gordon, Pymble, Turramurra, Warrawee, Wahroonga, Waitara, Hornsby, Asquith, Mount Colah, Mount Kuring-gai and Berowra.",
        "Please mind the gap between the train and the platform.",
        //"Change for M1 Tallawong to Sydenham, T1 North Shore and Northern, T2 Inner West and Leppington, T3 Bankstown, T4 Eastern Suburbs and Illawarra, T8 Airport and South services, intercity services from platforms 4 to 12, light rail services from Chalmers Street and buses and coaches.",
      ],
    },
  ];

  constructor(reqs: PidBaseClassReqs) {
    super(reqs);

    const svgContainer = document.createElement("div");

    createLEDPanel(statics.size[0], statics.size[1], svgContainer);

    this.injectionContainer.appendChild(svgContainer);

    for (let i = 0; i < statics.size[0] * statics.size[1]; i++) {
      this.SvgPixels[i] = svgContainer.querySelector(
        `#led-${i}`
      ) as SVGGElement;
    }

    this.measurementSink.createMeasurement("Render Time", "sliding");

    this.start();
  }

  teardown() {
    this.running = false;
    clearInterval(this.timeout);
  }
  stop() {
    this.running = false;
  }
  start() {
    this.running = true;
    this.lastUpdateTime = Date.now();
    this.signalScreenUpdate();
    window.requestAnimationFrame(() => {
      this.renderFrame();
    });
  }

  runScrollUpdate() {
    this.scrollPos = this.scrollPos.map((sp, i) => {
      if (sp < 0 - this.lineWidths[i]) {
        return statics.size[0];
      } else {
        return sp - 1;
      }
    });
  }

  renderFrame() {
    const start = performance.now();
    this.render();

    this.imageData.forEach((state, i) => {
      this.SvgPixels[i].style.display = state ? "block" : "none";
    });

    window.requestAnimationFrame(() => {
      const time = performance.now() - start;
      this.measurementSink.reportMeasurement("Render Time", time);
      this.renderFrame();
    });
  }

  setPixel = (x: number, y: number, state: boolean) => {
    if (x < 0 || x >= statics.size[0] || y < 0 || y >= statics.size[1]) return;
    this.imageData[y * statics.size[0] + x] = state;
  };

  render() {
    for (let x = 0; x < statics.size[0]; x++) {
      for (let y = 0; y < statics.size[1]; y++) {
        this.setPixel(x, y, false);
      }
    }

    for (const element of this.renderElements) {
      if (element.type === "text") this.renderElementTextualContent(element);
      if (element.type === "icon") this.renderElementIcon(element);
    }
  }

  placeCharacter = (x: number, y: number, char: string) => {
    const pixeldata = (
      this.font.has(char) ? this.font.get(char) : this.font.get("notfound")
    ) as number[][];

    if (x < -pixeldata[0].length || x >= statics.size[0]) return;

    for (let i = 0; i < pixeldata.length; i++) {
      for (let j = 0; j < pixeldata[i].length; j++) {
        if (pixeldata[i][j] === 1) {
          this.setPixel(x + j, y + i, true);
        }
      }
    }
  };

  getCharacterSize(char: string) {
    const pixeldata = (
      this.font.has(char) ? this.font.get(char) : this.font.get("notfound")
    ) as number[][];
    return [pixeldata[0].length, pixeldata.length];
  }

  renderElementTextualContent(el: RenderElement) {
    const { line, align } = el.flags;
    const content = (el.content as string[])
      .map((s) => s.split("").join("|"))
      .join("".padEnd(statics.size[0] / 2 + 5, " "))
      .split("");
    const charWidth = content.map((char) =>
      char == "|" ? 1 : this.getCharacterSize(char)[0]
    );
    const width = charWidth.reduce((a, b) => a + b, 0);

    if (width !== this.lineWidths[line]) {
      this.lineWidths[line] = width;
      this.scrollPos[line] = statics.size[0];
    }

    let x = 0;
    if (align === "scroll") {
      x = this.scrollPos[line];
    } else if (align === "left") {
      x = 0;
    } else if (align === "center") {
      x = Math.floor((statics.size[0] - width) / 2);
    } else if (align === "right") {
      x = statics.size[0] - content.length * 5;
    }

    for (let i = 0; i < content.length; i++) {
      if (content[i] !== "|") {
        this.placeCharacter(x, statics.linePos[line], content[i]);
        x += this.getCharacterSize(content[i])[0];
      } else {
        x += 1;
      }
    }
  }
  renderElementIcon(el: RenderElement) {
    const x = 0,
      y = 0;

    const pixeldata = (
      this.icons.has(el.content)
        ? this.icons.get(el.content)
        : this.icons.get("notfound")
    ) as number[][];

    if (x < -pixeldata[0].length || x >= statics.size[0]) return;

    for (let i = 0; i < pixeldata.length; i++) {
      for (let j = 0; j < pixeldata[i].length; j++) {
        if (pixeldata[i][j] === 1) {
          this.setPixel(x + j, y + i, true);
        }
      }
    }
  }

  signalScreenUpdate() {
    this.scrollPos = this.scrollPos.map(() => statics.size[0]);
    this.render();
  }
}
