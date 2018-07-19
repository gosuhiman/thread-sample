import {Config} from "./config";
import ExampleWorker from "./example-worker";
import {State} from "./state";

class ThreadSampleApplication {
  startTime: number = 0;
  worker: ExampleWorker;
  count: number = 0;
  console: HTMLElement | null = null;

  constructor(public config: Config) {
    this.startTime = Date.now();
    this.worker = new ExampleWorker();
    this.setup();
  }

  setup() {
    this.console = document.getElementById('console');

    this.worker.addEventListener("message", (e: MessageEvent) => {
      let state: State = State.fromObject(e.data);
      if (this.config.logging) {
        console.log(state.origin, state);
      }

      if (this.count < this.config.maxCount) {
        this.count++;
        state.origin = "MAIN";
        state.time = Date.now();
        this.worker.postMessage(state);
      } else {
        this.log("----- STOP -----");
        const testTime: number = Date.now() - this.startTime;
        this.log("Test results:");
        this.log("send count = " + this.config.maxCount);
        this.log("time = " + testTime + "ms");
        this.log("avg send time = " + testTime / this.config.maxCount + "ms");
        this.worker.terminate();
      }
    });
  }

  run() {
    const initialState = new State();
    initialState.origin = "MAIN";
    initialState.wololo = "f73hf8273hf82hfsihfsiudhfosiuhfsiudfhsdf";
    initialState.time = Date.now();
    initialState.obj = {
      a: "asdad34g3g",
      b: 3458239478
    };
    this.log("----- START -----");
    this.worker.postMessage(initialState);
  }

  log(message: string) {
    if (this.console == null) {
      throw new Error("Console HTML element not found");
    }

    console.log(message);
    const logElement: HTMLElement = document.createElement('div');
    logElement.innerHTML = message;
    this.console.appendChild(logElement);
  }
}

const app = new ThreadSampleApplication({
  maxCount: 1000,
  logging: false
});

app.run();