"use client";
import { useTheme } from "next-themes";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-zinc-300 !bg-opacity-50 rounded-2xl  p-7">
        <p className="label text-sm  font-bold">{`Total Revenue in ${label}: $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const OverView = ({ data }) => {
  const { theme } = useTheme();

  return (
    <div className=" w-[1100px] h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <XAxis
            stroke={theme == "dark" ? "white" : "black"}
            dataKey={"month"}
            fontSize={12}
          />
          <YAxis
            stroke={theme == "dark" ? "white" : "black"}
            tickFormatter={(e) => `$${e}`}
          />
          <Bar dataKey="total" radius={[5, 5, 0, 0]} fill="#21a0ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverView;
