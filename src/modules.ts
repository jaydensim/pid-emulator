import { StpDefinition } from "./patterns/stoppingPatterns";
import { PidSetupInfo } from "./pids/pid";

type Pid = Promise<{
  default: PidSetupInfo;
}>;

type Pattern = Promise<{
  default: StpDefinition;
}>;

export const pidsAsync = () => {
  return [
    import(`./pids/SydneyTrains-Aset/index`) as Pid,
    import(`./pids/SydneyTrains-Bset`) as Pid,
  ];
};

export const stopsAsync = () => {
  return [
    import(`./patterns/sydney/t1northshore-central-berowa`) as Pattern,
    import(`./patterns/sydney/t9northern-central-hornsby`) as Pattern,
  ];
};
