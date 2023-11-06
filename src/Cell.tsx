import "./game.scss";
import { Dispatch, SetStateAction } from "react";

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
  color: string
}) => {

  const handleClick = () => {
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

  return <div className={`cell ${state} ${color}`} onClick={handleClick}></div>;
};
