import { useState } from "react";
import { Cell } from "./Cell";
import { ConfigOptions } from "./ConfigOptions";
import "./game.scss";

export const Game = ({
  numRows,
  numCols,
}: {
  numRows: number;
  numCols: number;
}) => {
  const [livingCells, setLivingCells] = useState<number[][]>([]);
  const [color, setColor] = useState<string>("blue");

  const livingCoordinates: string[] = livingCells.map((cell) => cell.join());

  const renderCells = () => {
    let cells = [];
    let state: "living" | "dead" = "dead";

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        if (livingCoordinates.some((coord) => coord === [x, y].join())) {
          state = "living";
        } else state = "dead";
        cells.push(
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            state={state}
            setLivingCells={setLivingCells}
            color={color}
          />
        );
      }
    }
    return cells;
  };

  const countLivingNeighbors = (x: number, y: number) => {
    let numLivingNeighbors = 0;

    for (let livingCell of livingCells) {
      const [first, second] = livingCell;

      if (
        Math.abs(first - x) <= 1 &&
        Math.abs(second - y) <= 1 &&
        !(first === x && second === y)
      ) {
        numLivingNeighbors++;
      }
    }
    return numLivingNeighbors;
  };

  const advanceGeneration = () => {
    let newLivingCells = [];

    for (let x = 0; x < numCols; x++) {
      for (let y = 0; y < numRows; y++) {
        const numLivingNeighbors = countLivingNeighbors(x, y);

        const isCellLiving = livingCells.some(
          (cell) => cell[0] === x && cell[1] === y
        );

        if (
          isCellLiving &&
          (numLivingNeighbors === 2 || numLivingNeighbors === 3)
        ) {
          newLivingCells.push([x, y]);
        } else {
          if (numLivingNeighbors === 3) {
            newLivingCells.push([x, y]);
          }
        }
      }
    }

    setLivingCells(newLivingCells);
  };

  const clearBoard = () => {
    setLivingCells([]);
  };

  console.log("livingCells", livingCells);

  return (
    <>
      <div>
        <h1>Game of Life</h1>
        <p>Click a cell to set its state. Click and drag for easy drawing.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 25px)`,
          }}
        >
          {renderCells()}
        </div>
        <button className="next" onClick={advanceGeneration}>
          Next generation
        </button>
        <button className="clear" onClick={clearBoard}>
          Clear board
        </button>
      </div>
      <ConfigOptions
        color={color}
        setColor={setColor}
        setLivingCells={setLivingCells}
      />
    </>
  );
};
