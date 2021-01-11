import { randomBytes } from "crypto";
import WebSocket from "ws";

export class Computer {
  socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
  }

  private getNonce(): string {
    return randomBytes(16).toString("base64");
  }

  async exec<T>(data: string): Promise<T> {
    return new Promise((r) => {
      let nonce = this.getNonce();
      let packet = JSON.stringify({
        type: "eval",
        data: data,
        nonce: nonce,
      });
      this.socket.send(packet);

      const listener = (response: string) => {
        try {
          let res = JSON.parse(response);
          if (res.nonce === nonce) {
            r(res.data);
            this.socket.off("message", listener);
          }
        } catch (_) {}
      };
      this.socket.on("message", listener);
    });
  }
}

export class Turtle extends Computer {
  async craft(quantity: number): Promise<boolean> {
    return this.exec<boolean>(`return turtle.craft(${quantity})`);
  }

  async forward(): Promise<boolean> {
    return this.exec<boolean>("return turtle.forward()");
  }

  async back(): Promise<boolean> {
    return this.exec<boolean>("return turtle.back()");
  }

  async up(): Promise<boolean> {
    return this.exec<boolean>("return turtle.up()");
  }

  async down(): Promise<boolean> {
    return this.exec<boolean>("return turtle.down()");
  }

  async turnLeft(): Promise<boolean> {
    return this.exec<boolean>("return turtle.turnLeft()");
  }

  async turnRight(): Promise<boolean> {
    return this.exec<boolean>("return turtle.turnRight()");
  }

  async select(slot: number): Promise<boolean> {
    return this.exec<boolean>(`return turtle.select(${slot})`);
  }

  async getSelectedSlot(): Promise<number> {
    return this.exec<number>("return turtle.getSelectedSlot()");
  }

  async getItemCount(slot?: number): Promise<number> {
    return slot
      ? this.exec<number>(`return turtle.getItemCount(${slot})`)
      : this.exec<number>("return turtle.getItemCount()");
  }

  async getItemSpace(slot?: number): Promise<number> {
    return this.exec<number>(
      slot
        ? `return turtle.getItemSpace(${slot})`
        : "return turtle.getItemSpace()"
    );
  }

  async getItemDetail(slot?: number): Promise<number> {
    return this.exec<number>(
      slot
        ? `return turtle.getItemDetail(${slot})`
        : "return turtle.getItemDetail()"
    );
  }

  async equipLeft(): Promise<boolean> {
    return this.exec<boolean>("return turtle.equipLeft()");
  }

  async equipRight(): Promise<boolean> {
    return this.exec<boolean>("return turtle.equipRight()");
  }

  async attack(side?: string): Promise<boolean> {
    return this.exec<boolean>(
      side ? `return turtle.attack("${side}")` : "return turtle.attack()"
    );
  }

  async attackUp(side?: string): Promise<boolean> {
    return this.exec<boolean>(
      side ? `return turtle.attackUp("${side}")` : "return turtle.attackUp()"
    );
  }

  async attackDown(side?: string): Promise<boolean> {
    return this.exec<boolean>(
      side
        ? `return turtle.attackDown("${side}")`
        : "return turtle.attackDown()"
    );
  }

  async dig(side?: string): Promise<boolean> {
    return this.exec<boolean>(
      side ? `return turtle.dig("${side}")` : "return turtle.dig()"
    );
  }

  async digUp(side?: string): Promise<boolean> {
    return this.exec<boolean>(
      side ? `return turtle.digUp("${side}")` : "return turtle.digUp()"
    );
  }

  async digDown(side?: string): Promise<boolean> {
    return this.exec<boolean>(
      side ? `return turtle.digDown("${side}")` : "return turtle.digDown()"
    );
  }

  async place(text?: string): Promise<boolean> {
    return this.exec<boolean>(
      text ? `return turtle.place("${text}")` : "return turtle.place()"
    );
  }

  async placeUp(): Promise<boolean> {
    return this.exec<boolean>("return turtle.placeUp()");
  }

  async placeDown(): Promise<boolean> {
    return this.exec<boolean>("return turtle.placeDown()");
  }

  async detect(): Promise<boolean> {
    return this.exec<boolean>("return turtle.detect()");
  }

  async detectUp(): Promise<boolean> {
    return this.exec<boolean>("return turtle.detectUp()");
  }

  async detectDown(): Promise<boolean> {
    return this.exec<boolean>("return turtle.detectDown()");
  }

  async inspect(): Promise<any> {
    let success = this.exec<boolean>("return turtle.inspect()");
    if (!success) {
      return undefined;
    }
    return this.exec<any>("select(2, return turtle.inspect())");
  }

  async inspectUp(): Promise<any> {
    let success = this.exec<boolean>("return turtle.inspectUp()");
    if (!success) {
      return undefined;
    }
    return this.exec<any>("select(2, return turtle.inspectUp())");
  }

  async inspectDown(): Promise<any> {
    let success = this.exec<boolean>("return turtle.inspectDown()");
    if (!success) {
      return undefined;
    }
    return this.exec<any>("select(2, return turtle.inspectDown())");
  }

  async compare(): Promise<boolean> {
    return this.exec<boolean>("return turtle.compare()");
  }

  async compareUp(): Promise<boolean> {
    return this.exec<boolean>("return turtle.compareUp()");
  }

  async compareDown(): Promise<boolean> {
    return this.exec<boolean>("return turtle.compareDown()");
  }

  async compareTo(slot: number): Promise<boolean> {
    return this.exec<boolean>(`return turtle.compareTo(${slot})`);
  }

  async drop(count?: number): Promise<boolean> {
    return this.exec<boolean>(
      count ? `return turtle.drop(${count})` : "return turtle.drop()"
    );
  }

  async dropUp(count?: number): Promise<boolean> {
    return this.exec<boolean>(
      count ? `return turtle.dropUp(${count})` : "return turtle.dropUp()"
    );
  }

  async dropDown(count?: number): Promise<boolean> {
    return this.exec<boolean>(
      count ? `return turtle.dropDown(${count})` : "return turtle.dropDown()"
    );
  }

  async suck(amount?: number): Promise<boolean> {
    return this.exec<boolean>(
      amount ? `return turtle.suck(${amount})` : "return turtle.suck()"
    );
  }

  async suckUp(amount?: number): Promise<boolean> {
    return this.exec<boolean>(
      amount ? `return turtle.suckUp(${amount})` : "return turtle.suckUp()"
    );
  }

  async suckDown(amount?: number): Promise<boolean> {
    return this.exec<boolean>(
      amount ? `return turtle.suckDown(${amount})` : "return turtle.suckDown()"
    );
  }

  async refuel(quantity?: number): Promise<boolean> {
    return this.exec<boolean>(
      quantity ? `return turtle.refuel(${quantity})` : "return turtle.refuel()"
    );
  }

  async getFuelLevel(): Promise<number> {
    return this.exec<number>("return turtle.getFuelLevel()");
  }

  async getFuelLimit(): Promise<number> {
    return this.exec<number>("return turtle.getFuelLimit()");
  }

  async transferTo(slot: number, quantity?: number) {
    return this.exec<boolean>(
      quantity
        ? `return turtle.transferTo(${slot}, ${quantity})`
        : `return turtle.transferTo(${slot})`
    );
  }
}
