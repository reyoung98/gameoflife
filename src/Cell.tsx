import "./game.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const Cell = ({
  x,
  y,
  state,
  setLivingCells,
  color,
}: {
  x: number;
  y: number;
  state: "living" | "dead";
  setLivingCells: Dispatch<SetStateAction<number[][]>>;
  color: string;
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const changeCellState = () => {
    setLivingCells((prevCells) => {
      const coordinateExists = prevCells.some(
        (cell) => cell[0] === x && cell[1] === y
      );

      if (coordinateExists) {
        return prevCells.filter((cell) => !(cell[0] === x && cell[1] === y));
      } else {
        return [...prevCells, [x, y]];
      }
    });
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleDrag = () => {
    if (isMouseDown) {
      changeCellState();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`cell ${state} ${color}`}
      onClick={changeCellState}
      onMouseOver={handleDrag}
    ></div>
  );
};
