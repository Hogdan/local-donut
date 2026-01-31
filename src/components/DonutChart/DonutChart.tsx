import React, {
  useEffect,
  FC,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
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
  displayValue?: number;
  size?: number;
  strokeWidth?: number;
  labelStyle?: object;
  titleWrapStyle?: object;
  titleStyle?: object;
  hrsStyle?: object;
  labelText?: string;
};

export type DonutChartDataItem = {
  color: string;
  percent: number;
};

export type DonutChartData = DonutChartDataItem[];

export interface DonutChartRef {
  refresh: () => void;
}

export const DonutChart = forwardRef<
  DonutChartRef,
  DonutChartProps & { chartData: DonutChartData }
>(
  (
    {
      displayValue,
      chartData = [],
      size = 200,
      strokeWidth = 8,
      labelStyle = {},
      titleWrapStyle = {},
      titleStyle = {},
      hrsStyle = {},
      labelText = "",
    },
    ref,
  ) => {
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

    useImperativeHandle(ref, () => ({
      refresh,
    }));

    return (
      <View style={{ width: size, height: size }}>
        <View style={[styles.titleWrap, titleWrapStyle]}>
          <Text style={[styles.labelStyle, labelStyle]}>{labelText}</Text>

          <Text style={[styles.titleStyle, titleStyle]}>
            {displayValue}&nbsp;
            <Text style={[styles.hrsStyle, hrsStyle]}>hrs</Text>
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
  },
);

const styles = StyleSheet.create({
  titleWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
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
