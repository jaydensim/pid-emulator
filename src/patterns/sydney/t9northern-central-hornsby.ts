import { StpDefinition } from "../stoppingPatterns";
import { Stop } from "./stop";

const StoppingPattern =
  "Central, Redfern, Burwood, Strathfield, North Strathfield, Concord West, Rhodes, Meadowbank, West Ryde, Denistone, Eastwood, Epping, Cheltenham, Beecroft, Pennant Hills, Thornleigh, Normanhurst, Hornsby";

const SydneyT9Northern: StpDefinition = {
  id: "sydney-t9-north-shore-central-ber",
  supportedPids: ["sydt-a-ver1"],
  line: "Sydney Trains - T9 Northern",
  name: "T9 Central to Hornsby",
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

export default SydneyT9Northern;
