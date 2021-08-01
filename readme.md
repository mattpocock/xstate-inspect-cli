> FYI! This lib has never worked! I have it public only to share for others to carry on this good fight. I may revisit this repo in the future.

# What is the XState Inspector CLI?

I wanted a quick way to open an `@xstate/inspect` panel targeting a local file. By running a quick CLI command, you can target a single file with `vite`, build it with `esbuild`, and open it in the browser.

Changes to the machine will hot-reload into the browser, too.

# Getting Started

`yarn global add xstate-inspect-cli`

# Running the CLI

`xstate-inspect-cli ./desired-file.ts`

The inspector will open at `localhost:3001`. Check the console for any errors with your machine, for instance missing guards/services/actions etc.

## Limitations

1. Your machine must be exported from the module, i.e. `export const machine = createMachine();`, though you can export multiple machines.
2. Works best in files where the machine is one of very few exports. Likely won't work if you are importing many modules or executing arbitrary code in your machine file.
3. Modules which are not parse-able by `vite` may fail the build.
4. Probably a bunch of others I haven't discovered yet.
