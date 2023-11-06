import { useState } from "react";
import { Cell } from "./cell";
import "./game.scss";
import {
  diamondConfig,
  gliderConfig,
  heartConfig,
  pulseConfig,
  quiltConfig,
  stripeConfig,
} from "./starting-configs";

export const Game = ({
  numRows,
  numCols,
}: {
  numRows: number;
  numCols: number;
}) => {
  const [livingCells, setLivingCells] = useState<number[][]>([]);
  const [color, setColor] = useState<string>('blue')

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

  const selectConfig = (config: number[][]) => {
    setLivingCells(config);
  }; // why doesn't this work?

  const selectPulseConfig = () => {
    setLivingCells(pulseConfig);
  };

  const selectGliderConfig = () => {
    setLivingCells(gliderConfig);
  };

  const selectHeartConfig = () => {
    setLivingCells(heartConfig);
  };

  const selectStripeConfig = () => {
    setLivingCells(stripeConfig);
  };

  const selectQuiltConfig = () => {
    setLivingCells(quiltConfig);
  };

  const selectDiamondConfig = () => {
    setLivingCells(diamondConfig);
  };

  console.log("livingCells", livingCells);

  const selectColor = (color: string) => {
    setColor(color)
  }

  return (
    <>
      <div>
        <h1>Game of Life</h1>
        <p>Click a cell to set its state</p>
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
      <div className="config-options">
        <p>Choose starting configuration</p>
        <button onClick={selectPulseConfig}>Pulse</button>
        <button onClick={selectGliderConfig}>Gliders</button>
        <button onClick={selectHeartConfig}>Heart</button>
        <button onClick={selectStripeConfig}>Stripes</button>
        <button onClick={selectQuiltConfig}>Quilt</button>
        <button onClick={selectDiamondConfig}>Diamonds</button>
        <div className="color-select">
            <div className="box coral" onClick={() => selectColor('coral')}></div>
          <div className="box aquamarine" onClick={() => selectColor('aquamarine')}></div>
          <div className="box gray" onClick={() => selectColor('gray')}></div>
          <div className="box blue" onClick={() => selectColor('blue')}></div>
        </div>
      </div>
    </>
  );
};