import React from "react";
import { StyledPie } from "./Pie.styled";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ pct, total }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      strokeWidth={"2rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage}
    </text>
  );
};

const Pie = ({ percentage, total }) => {
  const pct = cleanPercentage((percentage / total) * 100);
  return (
    <StyledPie width={200} height={200} $percentage={percentage}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle />
        <Circle pct={pct} total={total}/>
      </g>
      <Text percentage={percentage} />
    </StyledPie>
  );
};

export default Pie;
