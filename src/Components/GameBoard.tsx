import React from "react";
import { useRef, useState } from "react";
import "./gameboard.css";
import Space from "./Space";

interface Ship {
  image: string;
  vertical: number;
  horizontal: number;
}

const startBoardState: Ship[] = [];

const ships: Ship[] = [];

for (let i = 0; i < 5; i++) {
  startBoardState.push({
    image: `Images/battleship_${i + 1}.png`,
    vertical: i + 0,
    horizontal: 0,
  });
}

for (let i = 0; i < 5; i++) {
  startBoardState.push({
    image: `Images/battleship_${i + 1}.png`,
    vertical: i + 2,
    horizontal: 7,
  });
}

for (let i = 0; i < 5; i++) {
  startBoardState.push({
    image: `Images/battleship_${i + 1}.png`,
    vertical: i + 5,
    horizontal: 9,
  });
}

function GameBoard() {
  const [ships, setShips] = useState<Ship[]>(startBoardState);
  const [activeShip, setActiveShip] = useState<HTMLElement | null>(null);
  const [boardX, setBoardX] = useState(0);
  const [boardY, setBoardY] = useState(0);

  const boardRef = useRef<HTMLDivElement>(null);

  function selectShip(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const board = boardRef.current;

    if (element.classList.contains("parked") && board) {
      const boardX = Math.floor((e.clientX - board.offsetLeft) / 50);
      const boardY = Math.floor((e.clientY - board.offsetTop) / 50);

      setBoardX(boardX);
      setBoardY(boardY);

      const x = e.clientX - 25;
      const y = e.clientY - 25;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActiveShip(element);

      console.log("pickup", boardX, boardY);
    }
  }

  function moveShip(e: React.MouseEvent) {
    const board = boardRef.current;
    if (activeShip && board) {
      const minX = board.offsetLeft;
      const minY = board.offsetTop;
      const maxX = board.offsetLeft + board.clientWidth - 50;
      const maxY = board.offsetTop + board.clientHeight - 50;
      const x = e.clientX - 25;
      const y = e.clientY - 25;
      activeShip.style.position = "absolute";

      //constrains the ships to the board
      if (x < minX) {
        activeShip.style.left = `${minX}px`;
      } else if (x > maxX) {
        activeShip.style.left = `${maxX}px`;
      } else {
        activeShip.style.left = `${x}px`;
      }
      if (y < minY) {
        activeShip.style.top = `${minY}px`;
      } else if (y > maxY) {
        activeShip.style.top = `${maxY}px`;
      } else {
        activeShip.style.top = `${y}px`;
      }
    }
  }

  function dropShip(e: React.MouseEvent) {
    const board = boardRef.current;
    if (activeShip && board) {
      const x = Math.floor((e.clientX - board.offsetLeft) / 50);
      const y = Math.floor((e.clientY - board.offsetTop) / 50);
      console.log("drop", x, y);

      setShips((value) => {
        const ships = value.map((s) => {
          if (s.vertical === boardX && s.horizontal === boardY) {
            s.vertical = x;
            s.horizontal = y;
          }
          return s;
        });
        return ships;
      });
      setActiveShip(null);
    }
  }

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
          coord={horizontal[x].concat(vertical[y])}
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
      ref={boardRef}
    >
      {board}
    </div>
  );
}

export default GameBoard;
