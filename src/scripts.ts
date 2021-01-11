import AppTurtle from "./appturtle";

export async function lilDance(turtle: AppTurtle) {
  for (let i = 0; i < 50; i++) {
    console.log(`Turning: ${i + 1}/50`);
    i % 2 == 0 ? await turtle.turnLeft() : await turtle.turnRight();
  }
}
