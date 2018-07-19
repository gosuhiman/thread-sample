import * as _ from "lodash";

export class State {
  origin: string = "none";
  wololo: string = "";
  time: number = 0;
  obj: { a: string, b: number } = {a: "", b: 0};

  static fromObject(obj: any): State {
    const s: State = new State();
    _.merge(s, obj);
    return s;
  }
}