// Updated RealisticHand.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedProps,
  Easing
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RealisticHand = ({ fingers, isLeft }) => {
  // Natural hand positioning
  const handRotation = isLeft ? '10deg' : '-10deg';
  const handBaseX = isLeft ? 30 : 70;

  // Finger paths with natural curvature
  const fingerPaths = {
    thumb: `M${handBaseX},75 Q${handBaseX-15},60 ${handBaseX-25},40 Q${handBaseX-30},25 ${handBaseX-35},15`,
    index: `M${handBaseX+10},50 L${handBaseX+10},15 Q${handBaseX+5},5 ${handBaseX},0`,
    middle: `M${handBaseX+15},55 L${handBaseX+15},10 Q${handBaseX+20},0 ${handBaseX+25},5`,
    ring: `M${handBaseX+20},50 L${handBaseX+20},15 Q${handBaseX+25},5 ${handBaseX+30},0`,
    pinky: `M${handBaseX+25},45 L${handBaseX+30},20 Q${handBaseX+35},10 ${handBaseX+40},5`
  };

  // Animation values
  const thumbProgress = useSharedValue(0);
  const fingersProgress = useSharedValue(0);

  useEffect(() => {
    thumbProgress.value = withTiming(fingers.thumb ? 1 : 0, {
      duration: 800,
      easing: Easing.out(Easing.exp)
    });
    fingersProgress.value = withTiming(
      fingers.index || fingers.middle || fingers.ring || fingers.pinky ? 1 : 0, 
      { duration: 600 }
    );
  }, [fingers]);

  const animatedThumbProps = useAnimatedProps(() => ({
    strokeOpacity: thumbProgress.value,
    strokeWidth: 6 + thumbProgress.value * 2
  }));

  const animatedFingerProps = useAnimatedProps(() => ({
    strokeOpacity: fingersProgress.value,
    strokeWidth: 5 + fingersProgress.value * 1
  }));

  return (
    <View style={{ 
      transform: [{ rotate: handRotation }],
      marginHorizontal: isLeft ? -15 : 15 
    }}>
      <Svg height="180" width="150" viewBox="0 0 100 100">
        <G transform={isLeft ? "scale(-1,1) translate(-100,0)" : ""}>
          {/* Palm */}
          <Circle cx={handBaseX} cy="65" r="22" fill="#FFD699" />
          
          {/* Thumb */}
          <AnimatedPath
            d={fingerPaths.thumb}
            stroke="#FFA726"
            fill="none"
            animatedProps={animatedThumbProps}
          />
          {fingers.thumb && (
            <AnimatedCircle
              cx={handBaseX-35}
              cy="15"
              r="5"
              fill="#EF5350"
              opacity={thumbProgress}
            />
          )}
          
          {/* Other fingers */}
          {['index', 'middle', 'ring', 'pinky'].map((finger) => (
            <React.Fragment key={finger}>
              <AnimatedPath
                d={fingerPaths[finger]}
                stroke="#FFB74D"
                fill="none"
                animatedProps={animatedFingerProps}
              />
              {fingers[finger] && (
                <AnimatedCircle
                  cx={finger === 'pinky' ? handBaseX+40 : handBaseX + ['index','middle','ring'].indexOf(finger)*5}
                  cy={finger === 'pinky' ? 5 : 0}
                  r="4"
                  fill="#EF5350"
                  opacity={fingersProgress}
                />
              )}
            </React.Fragment>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default RealisticHand;