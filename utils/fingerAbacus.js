// Finger representation logic for numbers 0-99
export const getFingerRepresentation = (number) => {
    if (number < 0 || number > 99) return null;
  
    const representation = {
      leftHand: {
        thumb: false,
        index: false,
        middle: false,
        ring: false,
        pinky: false,
        value: 0,
      },
      rightHand: {
        thumb: false,
        index: false,
        middle: false,
        ring: false,
        pinky: false,
        value: 0,
      },
    };
  
    // Right hand represents units (1-9)
    const units = number % 10;
    if (units >= 5) {
      representation.rightHand.thumb = true;
      representation.rightHand.value = 5;
    }
    if (units % 5 > 0) {
      for (let i = 0; i < units % 5; i++) {
        const finger = ['index', 'middle', 'ring', 'pinky'][i];
        representation.rightHand[finger] = true;
        representation.rightHand.value += 1;
      }
    }
  
    // Left hand represents tens (10-90)
    const tens = Math.floor(number / 10);
    if (tens >= 5) {
      representation.leftHand.thumb = true;
      representation.leftHand.value = 5;
    }
    if (tens % 5 > 0) {
      for (let i = 0; i < tens % 5; i++) {
        const finger = ['index', 'middle', 'ring', 'pinky'][i];
        representation.leftHand[finger] = true;
        representation.leftHand.value += 1;
      }
    }
  
    return representation;
  };