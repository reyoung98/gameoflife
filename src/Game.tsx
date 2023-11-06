import { useState } from "react";
import { Cell } from "./Cell";
import { ConfigOptions } from "./ConfigOptions";
import "./game.scss";
import { GameControls } from "./GameControls";

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
        <GameControls
          setLivingCells={setLivingCells}
          numCols={numCols}
          numRows={numRows}
        />
      </div>
      <ConfigOptions
        color={color}
        setColor={setColor}
        setLivingCells={setLivingCells}
      />
    </>
  );
};
