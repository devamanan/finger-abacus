import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  Easing,
  interpolate,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Finger = ({ fingerPos, isActive, delay }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
    );
  }, [isActive, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const x = interpolate(progress.value, [0, 1], [50, fingerPos.tipX]);
    const y = interpolate(progress.value, [0, 1], [50, fingerPos.tipY]);
    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  return (
    <>
      <AnimatedPath
        d={`M50,50 L${fingerPos.x},${fingerPos.y} ${fingerPos.tipX},${fingerPos.tipY}`}
        stroke="#FFD699"
        strokeWidth="8"
        fill="none"
      />
      {isActive && (
        <AnimatedCircle
          cx={fingerPos.tipX}
          cy={fingerPos.tipY}
          r="4"
          fill="red"
          style={[animatedStyle]}
        />
      )}
    </>
  );
};

const Thumb = ({ thumbPos, isActive, delay, isLeft }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) })
    );
  }, [isActive, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    const path = `M50,50 Q${thumbPos.x},${thumbPos.y} ${thumbPos.tipX},${thumbPos.tipY}`;
    return {
      d: path,
    };
  });

  return (
    <>
      <AnimatedPath
        stroke="#FFD699"
        strokeWidth="10"
        fill="none"
        style={animatedStyle}
      />
      {isActive && (
        <AnimatedCircle
          cx={thumbPos.tipX}
          cy={thumbPos.tipY}
          r="5"
          fill="red"
        />
      )}
    </>
  );
};

const AnimatedHand = ({ handData, isLeft = false, stepDelay = 0 }) => {
  const thumbPos = isLeft 
    ? { x: 40, y: 40, tipX: 20, tipY: 20 }
    : { x: 60, y: 40, tipX: 80, tipY: 20 };
  
  const fingersPos = [
    { x: 50, y: 20, tipX: 50, tipY: 0 },  // index
    { x: 55, y: 25, tipX: 55, tipY: 5 }, // middle
    { x: 50, y: 30, tipX: 50, tipY: 10 }, // ring
    { x: 45, y: 25, tipX: 45, tipY: 5 }, // pinky
  ];

  return (
    <View style={[styles.handContainer, isLeft ? styles.leftHand : styles.rightHand]}>
      <Svg height="100" width="100" viewBox="0 0 100 100">
        {/* Palm */}
        <Circle cx="50" cy="50" r="30" fill="#FFD699" />
        
        {/* Thumb */}
        <Thumb 
          thumbPos={thumbPos} 
          isActive={handData.thumb} 
          delay={stepDelay}
          isLeft={isLeft}
        />
        
        {/* Fingers */}
        {['index', 'middle', 'ring', 'pinky'].map((finger, index) => (
          <Finger
            key={finger}
            fingerPos={fingersPos[index]}
            isActive={handData[finger]}
            delay={stepDelay + (index + 1) * 200}
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  handContainer: {
    width: 100,
    height: 100,
    margin: 10,
  },
  leftHand: {
    transform: [{ scaleX: -1 }],
  },
  rightHand: {},
});

export default AnimatedHand;