import { PidCanvasDriver, PidBaseClassReqs } from "../../pid";
import { font as WaratahFont, icons as WaratahIcons } from "../support/font";

const statics = {
  size: [94, 17],
  backgroundColour: "202020",
  pixelColour: "E86F00",

  linePos: [0, 9],

  updateTime: 16,
};

interface RenderElement {
  type: "text" | "icon";
  flags: { line: number; align: "center" | "left" | "right" | "scroll" };
  content: any;
}

export class SydtAVer1_UsingCanvas extends PidCanvasDriver {
  running: boolean = false;
  imageData = new ImageData(statics.size[0], statics.size[1]);
  lastUpdateTime = 0;

  scrollPos = statics.linePos.map(() => statics.size[0]);

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
      ],
    },
  ];

  constructor(reqs: PidBaseClassReqs) {
    super(reqs);
    this.setCanvasSize(statics.size[0], statics.size[1]);
    this.ctx.fillStyle = `#${statics.backgroundColour}`;

    this.measurementSink.createMeasurement("Render Time", "sliding");

    this.start();
  }

  teardown() {
    this.running = false;
  }
  stop() {
    this.running = false;
  }
  start() {
    this.running = true;
    this.lastUpdateTime = Date.now();
    window.requestAnimationFrame(() => {
      this.renderFrame();
    });
  }
  renderFrame() {
    if (Date.now() - this.lastUpdateTime > statics.updateTime) {
      const start = performance.now();
      this.render();
      this.ctx.putImageData(this.imageData, 0, 0);
      const time = performance.now() - start;
      this.measurementSink.reportMeasurement("Render Time", time);
      this.lastUpdateTime = Date.now();
    }
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.renderFrame();
      });
    }
  }

  setPixel = (x: number, y: number, hex: string) => {
    if (
      x < 0 ||
      x >= this.imageData.width ||
      y < 0 ||
      y >= this.imageData.height
    )
      return;
    const index = (y * this.imageData.width + x) * 4;
    this.imageData.data[index + 0] = parseInt(hex.substring(0, 2), 16);
    this.imageData.data[index + 1] = parseInt(hex.substring(2, 4), 16);
    this.imageData.data[index + 2] = parseInt(hex.substring(4, 6), 16);
    this.imageData.data[index + 3] = 255;
  };

  render() {
    for (let x = 0; x < statics.size[0]; x++) {
      for (let y = 0; y < statics.size[1]; y++) {
        this.setPixel(x, y, statics.backgroundColour);
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

    for (let i = 0; i < pixeldata.length; i++) {
      for (let j = 0; j < pixeldata[i].length; j++) {
        if (pixeldata[i][j] === 1) {
          this.setPixel(x + j, y + i, statics.pixelColour);
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

    let x = 0;
    if (align === "scroll") {
      if (this.scrollPos[line] < 0 - width) {
        this.scrollPos[line] = statics.size[0];
      } else {
        this.scrollPos[line] -= 1;
      }
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
    const pixeldata = (
      this.icons.has(el.content)
        ? this.icons.get(el.content)
        : this.icons.get("notfound")
    ) as number[][];

    const x = 0,
      y = 0;

    for (let i = 0; i < pixeldata.length; i++) {
      for (let j = 0; j < pixeldata[i].length; j++) {
        if (pixeldata[i][j] === 1) {
          this.setPixel(x + j, y + i, statics.pixelColour);
        }
      }
    }
  }

  signalScreenUpdate() {
    this.scrollPos = this.scrollPos.map(() => statics.size[0]);
    this.render();
  }
}
