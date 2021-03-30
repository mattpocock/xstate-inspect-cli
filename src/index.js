#!/usr/bin/env node

const { createServer } = require("vite");
const path = require("path");

const [, , filePath] = process.argv;

if (!filePath) {
  console.log("You must provide a file path");
  process.exit(1);
}

const absoluteFilePath = path.resolve(process.cwd(), filePath);

(async () => {
  const server = await createServer({
    configFile: false,
    server: {
      port: 3001,
      open: true,
    },
    plugins: [
      {
        name: "Index Html Creator",
        apply: "serve",
        configureServer: (server) => {
          server.app.use((req, res, next) => {
            if (req.url === "/") {
              res.write(`
                <html>
                  <head>
                    <style>
                      body {
                        margin: 0px;
                        height: 100vh;
                        width: 100vw;
                        display: flex;
                        align-items: stretch;
                      }

                      body iframe {
                        width: 100%;
                        border: 0px solid;
                      }
                    </style>
                    <title>XState Inspector</title>
                  </head>
                  <body>
                  <iframe id="xstate-iframe"></iframe>
                  <script>
                    const FILE_PATH = "${absoluteFilePath}";
                  </script>
                  <script type="module" src="${path.resolve(
                    __dirname,
                    "./initInspector.ts",
                  )}"></script>
                  
                  </body>
                </html>
              `);
              res.end();
            } else {
              next();
            }
          });
        },
      },
    ],
  });

  await server.listen();
})();
