import WebSocket, { Server } from "ws";
import AppTurtle from "./appturtle";
import { lilDance } from "./scripts";
import express, { Express } from "express";

const PORT: number = 42069;

let turtles: AppTurtle[] = [];
let functions: Record<string, (turtle: AppTurtle) => Promise<any>> = {};

function createServer(port: number): Server {
  let server: Server = new Server({ port: port });
  server.on("connection", registerTurtle);
  console.log(`Server listening on port ${port}`);
  return server;
}

function registerFunction(
  name: string,
  callback: (turtle: AppTurtle) => Promise<any>
) {
  functions[name] = callback;
}

function createExpressServer(port: number): Express {
  let app = express();
  app.get("/api/turtles", (req, res) => {
    res.send(JSON.stringify(turtles.map((turtle) => turtle.id)));
  });
  console.log(`Express application listening on port ${port}`);
  app.listen(port);
  return app;
}

let app = createExpressServer(6969);

function registerTurtle(socket: WebSocket) {
  let turtle: AppTurtle = new AppTurtle(socket);
  turtles.push(turtle);

  socket.on("close", () => {
    let index = turtles.indexOf(turtle);
    if (index > -1) {
      turtles.splice(index, 1);
    }
  });

  socket.on("message", async (data: any) => {
    let packet = JSON.parse(data);
    let exec = packet.exec;
    if (exec && exec in functions) {
      let callback = functions[exec];
      await callback(turtle);
      await turtle.sendEndPacket();
    }
  });

  app.get(`/api/turtles/${turtle.id}`, async (req, res) => {
    let exec: string = req.query.exec as string;
    if (exec && exec in functions) {
      let callback = functions[exec];
      let response = await callback(turtle);
      res.send(response);
      return;
    }
    res.status(400).send("That's not a function");
  });
}

createServer(PORT);

// Call this function to bind "functions" to both the "callFunction" method in minecraft.lua
// and the endpoint API
// i.e. http://localhost:6969/api/turtles/${turtle.id}?exec=dance
// That will run the "lilDance" function
registerFunction("dance", lilDance);
