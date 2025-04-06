import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import NumberInput from './components/NumberInput';
import CartoonHand from './components/CartoonHand'; // Changed from RealisticHand
import { getFingerRepresentation } from './utils/fingerAbacus';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [fingerData, setFingerData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleNumberSubmit = (number) => {
    setCurrentNumber(number);
    setFingerData(getFingerRepresentation(number));
    setCurrentStep(0);
    setShowAll(false);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowAll(true);
    }
  };

  const getStepExplanation = () => {
    if (!fingerData || !currentNumber) return '';
    
    const steps = [
      `Start with both hands open (0)`,
      `Right hand (units place): ${fingerData.rightHand.thumb ? 'Show thumb (5)' : 'Keep thumb hidden'}`,
      `Right hand: Show ${fingerData.rightHand.value % 5} fingers for ${fingerData.rightHand.value % 5} more`,
      `Left hand (tens place): ${fingerData.leftHand.thumb ? 'Show thumb (50)' : 'Keep thumb hidden'}`,
      `Left hand: Show ${fingerData.leftHand.value % 5} fingers for ${(fingerData.leftHand.value % 5) * 10} more`,
    ];
    
    return steps.slice(0, showAll ? steps.length : currentStep + 1).join('\n\n');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NumberInput onNumberSubmit={handleNumberSubmit} />
      
      {fingerData && (
        <View style={styles.handsContainer}>
          <Text style={styles.numberText}>Showing: {currentNumber}</Text>
          
          {/* Updated Hands Display with CartoonHand */}
          <View style={styles.handsRow}>
            <CartoonHand 
              fingers={showAll ? fingerData.leftHand : currentStep >= 3 ? fingerData.leftHand : {
                thumb: false,
                index: false,
                middle: false,
                ring: false,
                pinky: false
              }} 
              isLeft={true}
            />
            <View style={{ width: 15 }} />
            <CartoonHand 
              fingers={showAll ? fingerData.rightHand : currentStep >= 1 ? fingerData.rightHand : {
                thumb: false,
                index: false,
                middle: false,
                ring: false,
                pinky: false
              }} 
              isLeft={false}
            />
          </View>
          
          <Text style={styles.explanation}>{getStepExplanation()}</Text>
          
          {!showAll && (
            <View style={styles.buttonContainer}>
              <Text 
                style={styles.nextButton} 
                onPress={handleNextStep}
              >
                {currentStep < 3 ? "Next Step →" : "Show All"}
              </Text>
            </View>
          )}
        </View>
      )}
      
      {/* Debug view - can be removed in production */}
      <View style={styles.debugView}>
        <Text style={styles.debugText}>Current number: {currentNumber || 'null'}</Text>
        <Text style={styles.debugText}>Finger data: {JSON.stringify(fingerData) || 'null'}</Text>
      </View>
    </ScrollView>
  );
}

// Keep all your existing styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  handsContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  handsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 20,
    height: 200,
  },
  numberText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  explanation: {
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 24,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  nextButton: {
    color: '#4a86e8',
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  debugView: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
  },
  debugText: {
    fontSize: 12,
    color: '#666',
  },
});