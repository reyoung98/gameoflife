import { Dispatch, SetStateAction, useState } from "react";

const countLivingNeighbors = (
  x: number,
  y: number,
  prevLivingCells: number[][]
) => {
  let numLivingNeighbors = 0;

  for (let livingCell of prevLivingCells) {
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

export const GameControls = ({
  setLivingCells,
  numCols,
  numRows,
}: {
  setLivingCells: Dispatch<SetStateAction<number[][]>>;
  numCols: number;
  numRows: number;
}) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const advanceGeneration = () => {
    setLivingCells((prevLivingCells) => {
      let newLivingCells: number[][] = [];

      for (let x = 0; x < numCols; x++) {
        for (let y = 0; y < numRows; y++) {
          const numLivingNeighbors = countLivingNeighbors(
            x,
            y,
            prevLivingCells
          );

          const isCellLiving = prevLivingCells.some(
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

      return newLivingCells;
    });
  };
  
  const nextGeneration = () => {
    stopInterval();
    advanceGeneration();
  };

  const clearBoard = () => {
    stopInterval();
    setLivingCells([]);
  };

  const startInterval = () => {
    if (!intervalId) {
      let newIntervalId = setInterval(advanceGeneration, 500);
      setIntervalId(newIntervalId);
    }
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="game-controls">
      {intervalId ? (
        <button className="pause" onClick={stopInterval}>
          Pause
        </button>
      ) : (
        <button className="play" onClick={startInterval}>
          Auto play
        </button>
      )}
      <button className="next" onClick={nextGeneration}>
        Next generation
      </button>

      <button className="clear" onClick={clearBoard}>
        Clear board
      </button>
    </div>
  );
};
