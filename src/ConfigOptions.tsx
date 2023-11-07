import { Dispatch, SetStateAction } from "react";
import {
  butterflyConfig,
  gliderConfig,
  heartConfig,
  pulseConfig,
  squareConfig,
  stripeConfig,
} from "./starting-configs";

import { Colors } from "./Colors";
import "./configOptions.scss";

export const ConfigOptions = ({
  color,
  setColor,
  setLivingCells,
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  setLivingCells: Dispatch<SetStateAction<number[][]>>;
}) => {
  return (
    <div className="config-options">
      <p>Choose starting configuration</p>
      <button onClick={() => setLivingCells(pulseConfig)}>Pulse</button>
      <button onClick={() => setLivingCells(gliderConfig)}>Gliders</button>
      <button onClick={() => setLivingCells(heartConfig)}>Heart</button>
      <button onClick={() => setLivingCells(stripeConfig)}>Stripes</button>
      <button onClick={() => setLivingCells(squareConfig)}>Squares</button>
      <button onClick={() => setLivingCells(butterflyConfig)}>Butterfly</button>
      <Colors color={color} setColor={setColor} />
      <p>
        View on{" "}
        <a target="_blank" href="https://github.com/reyoung98/gameoflife">
          Github
        </a>
      </p>
    </div>
  );
};
