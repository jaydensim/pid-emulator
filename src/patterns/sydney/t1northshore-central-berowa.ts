import { StpDefinition } from "../stoppingPatterns";
import { Stop } from "./stop";

const StoppingPattern =
  "Central, Town Hall, Wynyard, Milsons Point, North Sydney, Waverton, Wollstonecraft, St Leonards, Artarmon, Chatswood, Roseville, Lindfield, Killara, Gordon, Pymble, Turramurra, Warrawee, Wahroonga, Waitara, Hornsby, Asquith, Mount Colah, Mount Kuring-gai, Berowra";

const SydneyT1NorthShore: StpDefinition = {
  id: "sydney-t1-north-shore-central-ber",
  supportedPids: ["sydt-a-ver1"],
  line: "Sydney Trains - T1 North Shore",
  name: "T1 Central to Berowa",
  stops: StoppingPattern.split(", ").map((stop, index) => {
    return Stop(
      stop,
      index === 0
        ? "first"
        : index === StoppingPattern.split(", ").length - 1
        ? "last"
        : "stop"
    );
  }),
};

export default SydneyT1NorthShore;
