import React, { FC } from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const DonutChartSegment: FC<{
  center: number;
  radius: number;
  strokeWidth: number;
  color: string;
  circumference: number;
  angle: number;
  percent: number;
  progress: SharedValue<number>;
}> = ({
  center,
  radius,
  strokeWidth,
  circumference,
  color,
  angle,
  percent,
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)],
    );
    return {
      strokeDashoffset,
    };
  });

  const rotateAngle = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [0, angle]);
  });

  const transformString = useDerivedValue(() => {
    return `translate(${center}, ${center}) rotate(${rotateAngle.value}) translate(${-center}, ${-center})`;
  });

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      fillOpacity={0}
      animatedProps={animatedProps}
      // @ts-ignore
      transform={transformString.value}
    />
  );
};

export default DonutChartSegment;
