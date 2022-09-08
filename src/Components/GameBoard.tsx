import React from "react";
import "./gameboard.css";
import Space from "./Space";

interface Ship {
  image: string;
  vertical: number;
  horizontal: number;
}

//`Images/battleship_${x}.png`

const ships: Ship[] = [];

// for (let i = 0; i < 5; i++) {
//   ships.push({
//     image: `Images/battleship_${i + 1}.png`,
//     vertical: 0,
//     horizontal: i + 1,
//   });
// }

for (let i = 0; i < 5; i++) {
  ships.push({
    image: `Images/battleship_${i + 1}.png`,
    vertical: i + 4,
    horizontal: 3,
  });
}

for (let i = 0; i < 3; i++) {
  ships.push({
    image: `Images/battleship_${i + 1}.png`,
    vertical: i + 2,
    horizontal: 7,
  });
}

let activeShip: HTMLElement | null = null;

function selectShip(e: React.MouseEvent) {
  const element = e.target as HTMLElement;
  if (element.classList.contains("parked")) {
    console.log(e);

    const x = e.clientX;
    const y = e.clientY;
    element.style.position = "absolute";
    element.style.left = `${x - 25}px`;
    element.style.top = `${y - 25}px`;

    activeShip = element;
  }
}

function moveShip(e: React.MouseEvent) {
  if (activeShip) {
    const x = e.clientX;
    const y = e.clientY;
    activeShip.style.position = "absolute";
    activeShip.style.left = `${x - 25}px`;
    activeShip.style.top = `${y - 25}px`;
  }
}

function dropShip(e: React.MouseEvent) {
  if (activeShip) {
    activeShip = null;
  }
}

function GameBoard() {
  const vertical = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const horizontal = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  let board = [];

  for (let y = 0; y < horizontal.length; y++) {
    for (let x = 0; x < vertical.length; x++) {
      let image = undefined;

      ships.forEach((ship) => {
        if (ship.vertical === x && ship.horizontal === y) {
          image = ship.image;
        }
      });
      board.push(
        <Space
          key={`${x},${y}`}
          coord={horizontal[x].concat([vertical[y]])}
          image={image}
        />
      );
    }
  }
  return (
    <div
      onMouseMove={(e) => moveShip(e)}
      onMouseDown={(e) => selectShip(e)}
      onMouseUp={(e) => dropShip(e)}
      className="gameboard"
    >
      {board}
    </div>
  );
}

export default GameBoard;
