import { Dispatch, SetStateAction } from "react";

export const Colors = ({
  color,
  setColor,
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="color-select">
      <div
        className={`box coral ${color === "coral" ? "selected" : ""}`}
        onClick={() => setColor("coral")}
      ></div>
      <div
        className={`box aquamarine ${color === "aquamarine" ? "selected" : ""}`}
        onClick={() => setColor("aquamarine")}
      ></div>
      <div
        className={`box gray ${color === "gray" ? "selected" : ""}`}
        onClick={() => setColor("gray")}
      ></div>
      <div
        className={`box blue ${color === "blue" ? "selected" : ""}`}
        onClick={() => setColor("blue")}
      ></div>
    </div>
  );
};
