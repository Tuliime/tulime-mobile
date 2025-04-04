import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface SyncLoaderProps {
  color?: string;
  size?: number;
  speed?: number;
}

export const SyncLoader: React.FC<SyncLoaderProps> = ({
  color = "#36d7b7",
  size = 10,
  speed = 500,
}) => {
  const dotAnim = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const createAnimation = (index: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim[index], {
            toValue: -size * 0.6,
            duration: speed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim[index], {
            toValue: 0,
            duration: speed,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animations = dotAnim.map((_, i) => createAnimation(i));

    animations.forEach((anim, i) => {
      setTimeout(() => anim.start(), i * (speed / 2));
    });

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, [dotAnim, speed, size]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg height={size * 2 + size * 0.8} width={size * 6}>
        {dotAnim.map((anim, i) => (
          <AnimatedCircle
            key={i}
            cx={size + i * (size * 1.5)}
            cy={size}
            r={size / 2}
            fill={color}
            translateY={anim}
          />
        ))}
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
