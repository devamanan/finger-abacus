import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const Hand = ({ handData, isLeft = false }) => {
    // Base positions for fingers (these would need adjustment for realistic positioning)
    const thumbPos = isLeft
        ? { x: 40, y: 40, tipX: 20, tipY: 20 }
        : { x: 60, y: 40, tipX: 80, tipY: 20 };

    const fingersPos = [
        { x: 50, y: 20, tipX: 50, tipY: 0 },  // index
        { x: 55, y: 25, tipX: 55, tipY: 5 }, // middle
        { x: 50, y: 30, tipX: 50, tipY: 10 }, // ring
        { x: 45, y: 25, tipX: 45, tipY: 5 }, // pinky
    ];
    console.log("Rendering Hand component with:", handData);

    return (
        <View style={[styles.handContainer, isLeft ? styles.leftHand : styles.rightHand]}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
                {/* Palm */}
                <Circle cx="50" cy="50" r="30" fill="#FFD699" />

                {/* Thumb */}
                <Path
                    d={`M50,50 Q${thumbPos.x},${thumbPos.y} ${thumbPos.tipX},${thumbPos.tipY}`}
                    stroke="#FFD699"
                    strokeWidth="10"
                    fill="none"
                />
                {handData?.thumb && (
                    <Circle cx={thumbPos.tipX} cy={thumbPos.tipY} r="5" fill="red" />
                )}

                {/* Fingers */}
                {['index', 'middle', 'ring', 'pinky'].map((finger, index) => (
                    <React.Fragment key={finger}>
                        <Path
                            d={`M50,50 L${fingersPos[index].x},${fingersPos[index].y} ${fingersPos[index].tipX},${fingersPos[index].tipY}`}
                            stroke="#FFD699"
                            strokeWidth="8"
                            fill="none"
                        />
                        {handData && handData[finger] && (
                            <Circle cx={fingersPos[index].tipX} cy={fingersPos[index].tipY} r="4" fill="red" />
                        )}

                    </React.Fragment>
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
        transform: [{ scaleX: -1 }], // Flip to show left hand
    },
    rightHand: {},
});

export default Hand;