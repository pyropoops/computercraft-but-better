import WebSocket from "ws";
import { Turtle } from "./lib";
import names from "../names.json";

export default class AppTurtle extends Turtle {
  id: string;

  constructor(socket: WebSocket) {
    super(socket);
    this.id = this.generateID();
    this.exec<void>(`os.setComputerLabel("${this.id}")`);
  }

  generateID(): string {
    let i = Math.round(Math.random() * (names.length - 1));
    return names[i];
  }

  async sendEndPacket(): Promise<void> {
    this.socket.send(JSON.stringify({ type: "end" }));
  }
}
