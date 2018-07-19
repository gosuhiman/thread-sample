import {State} from "../state";

const ctx: Worker = self as any;

ctx.onmessage = (e: MessageEvent) => {
  let state: State = State.fromObject(e.data);
  state.origin = "WORKER";
  state.time = Date.now();
  ctx.postMessage(state);
};