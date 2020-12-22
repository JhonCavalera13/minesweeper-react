import React from "react";
import "../App.css";
import { mineColor } from "../utils/mineColors";
import Circle from "./Circle";

export default function Cell({ details, updateFlag, revealCell }) {
  const cellstyle = {
    background: details.revealed
      ? details.value === "X"
        ? mineColor()
        : bombChexPattern(details.x, details.y)
      : chexPattern(details.x, details.y),
    color: numColorCode(details.value),
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => revealCell(details.x, details.y)}
      style={cellstyle}
      className="cellStyle"
    >
      {
        !details.revealed && details.flagged ? (
          "🚩"
        ) : details.revealed && details.value !== 0 ? (
          details.value === "X" ? (
            <Circle />
          ) : (
              details.value
            )
        ) : (
              ""
            )
      }
    </div>
  );
}

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#e5c29f";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#d7b899";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#d7b899";
  } else {
    return "#e5c29f";
  }
};

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#aad751";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#a2d249";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#a2d249";
  } else {
    return "#aad751";
  }
};

const numColorCode = (num) => {
  switch (num) {
    case 1:
      return "#1976d2";
    case 2:
      return "#388d3c";
    case 3:
      return "#d33030";
    case 4:
      return "#7c21a2";
    case 5:
      return "#1976d2";
    case 6:
      return "#1976d2";
    default:
      return "white";
  }
};