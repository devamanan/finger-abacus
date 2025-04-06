import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';

const CartoonHand = ({ fingers, isLeft }) => {
  // Hand colors
  const handColor = '#FFD699';
  const fingerColor = '#FFA726';
  const activeColor = '#FF5252';
  const strokeWidth = 2;

  // Finger paths adjusted for cartoon style
  const fingerPaths = {
    thumb: isLeft 
      ? 'M35,75 Q20,60 15,45 Q10,30 20,20'
      : 'M65,75 Q80,60 85,45 Q90,30 80,20',
    index: 'M45,60 L45,15 Q45,5 50,0',
    middle: 'M50,60 L50,10 Q50,0 55,0',
    ring: 'M55,60 L55,15 Q55,5 60,0',
    pinky: isLeft
      ? 'M60,55 L65,30 Q70,20 65,10'
      : 'M40,55 L35,30 Q30,20 35,10'
  };

  return (
    <View style={{ 
      width: 120, 
      height: 160,
      transform: [{ scaleX: isLeft ? -1 : 1 }],
      marginHorizontal: 10
    }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <G>
          {/* Palm */}
          <Circle cx="50" cy="70" r="28" fill={handColor} stroke="#000" strokeWidth={strokeWidth}/>
          
          {/* Thumb */}
          <Path
            d={fingerPaths.thumb}
            stroke={fingers.thumb ? activeColor : fingerColor}
            strokeWidth={fingers.thumb ? 4 : strokeWidth}
            fill="none"
          />
          <Circle 
            cx={isLeft ? 20 : 80} 
            cy="20" 
            r="8" 
            fill={fingers.thumb ? activeColor : fingerColor}
            stroke="#000" 
            strokeWidth={strokeWidth}
          />
          
          {/* Fingers */}
          {['index', 'middle', 'ring', 'pinky'].map((finger) => (
            <React.Fragment key={finger}>
              <Path
                d={fingerPaths[finger]}
                stroke={fingers[finger] ? activeColor : fingerColor}
                strokeWidth={fingers[finger] ? 4 : strokeWidth}
                fill="none"
              />
              <Circle
                cx={finger === 'pinky' ? (isLeft ? 65 : 35) : [45, 50, 55][['index', 'middle', 'ring'].indexOf(finger)]}
                cy="0"
                r="6"
                fill={fingers[finger] ? activeColor : fingerColor}
                stroke="#000"
                strokeWidth={strokeWidth}
              />
            </React.Fragment>
          ))}
        </G>
      </Svg>
    </View>
  );
};

export default CartoonHand;