import { inspect } from "@xstate/inspect";
import { interpret } from "xstate";

inspect({
  iframe: () => document.getElementById("xstate-iframe") as any,
});

(async () => {
  const exports = await import(
    /* @vite-ignore */
    // @ts-ignore
    FILE_PATH
  );

  const machines = Object.values(exports);

  let foundMachine = false;

  machines.forEach((machine) => {
    // @ts-ignore
    if (machine && machine.__xstatenode) {
      // @ts-ignore
      interpret(machine, {
        devTools: true,
      }).start();

      foundMachine = true;
    }
  });

  if (!foundMachine) {
    alert("No machines found exported from this file!");
  }
})();
