import React, { useEffect, FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  Easing,
  ReduceMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { DonutChartSegment } from "./DonutSegment";

type DonutChartProps = {
  size?: number;
  strokeWidth?: number;
};

export type DonutChartDataItem = {
  color: string;
  percent: number;
};

export type DonutChartData = DonutChartDataItem[];

export const DonutChart: FC<
  DonutChartProps & { chartData: DonutChartData }
> = ({ chartData = [], size = 200, strokeWidth = 8 }) => {
  const progress = useSharedValue(0);
  const [data, setData] = useState<DonutChartData>([]);
  const [startAngles, setStartAngles] = useState<number[]>([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const refresh = () => {
    const filteredData = chartData.filter((item) => item.percent > 0);

    let angle = 0;
    const angles: number[] = [];
    filteredData.forEach((item) => {
      angles.push(angle);
      angle += item.percent * 360;
    });

    setData(filteredData);
    setStartAngles(angles);

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={{ width: size, height: size }}>
      <View style={styles.titleWrap}>
        <Text style={styles.labelStyle}>Total</Text>

        <Text style={styles.titleStyle}>
          {data.reduce((acc, item) => Math.floor(acc + item.percent * 12), 0)}{" "}
          <Text style={styles.hrsStyle}>hrs</Text>
        </Text>
      </View>
      <View style={[styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#414141ff"
            fillOpacity={0}
          />
          {data.map((item, index) => (
            <DonutChartSegment
              key={`${item.color}-${index}`}
              center={center}
              radius={radius}
              circumference={circumference}
              angle={startAngles[index]}
              color={item.color}
              percent={item.percent}
              strokeWidth={strokeWidth}
              progress={progress}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrap: {
    marginBottom: -160,
    alignItems: "center",
  },
  titleStyle: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "500",
  },
  hrsStyle: {
    color: "#ffffffff",
    fontSize: 18,
    fontWeight: "400",
  },
  labelStyle: {
    color: "#ffffffff",
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 25,
  },
  rotate: {
    transform: [{ rotateZ: "-90deg" }],
  },
});
