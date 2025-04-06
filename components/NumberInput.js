import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const NumberInput = ({ onNumberSubmit }) => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);

  const validateAndSubmit = () => {
    console.log('Input value:', number); // Debug log
    
    // Trim and check empty input
    const trimmedNumber = number.trim();
    if (!trimmedNumber) {
      setError('Please enter a number');
      console.log('Empty input detected');
      return;
    }

    // Parse the number
    const parsedNumber = parseInt(trimmedNumber, 10);
    console.log('Parsed number:', parsedNumber); // Debug log

    // Validate
    if (isNaN(parsedNumber)) {
      setError('Please enter a valid number (0-99)');
      console.log('NaN detected');
      return;
    }

    if (parsedNumber < 0 || parsedNumber > 99) {
      setError('Number must be between 0 and 99');
      console.log('Number out of range');
      return;
    }

    // If validation passes
    setError(null);
    console.log('Validation passed, submitting:', parsedNumber);
    onNumberSubmit(parsedNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a number (0-99):</Text>
      
      <TextInput
        style={[styles.input, error && styles.inputError]}
        keyboardType="number-pad"
        value={number}
        onChangeText={(text) => {
          console.log('Input changed:', text); // Debug log
          setNumber(text);
          // Clear error when user starts typing
          if (error) setError(null);
        }}
        placeholder="0-99"
        maxLength={2}
        onSubmitEditing={validateAndSubmit}
        testID="number-input"
      />
      
      <Button
        title="Show Finger Abacus"
        onPress={validateAndSubmit}
        color="#4a86e8"
        testID="submit-button"
      />
      
      {error && (
        <Text style={styles.errorText} testID="error-message">
          {error}
        </Text>
      )}

      {/* Debug view - can be removed in production */}
      <Text style={styles.debugText}>
        Current input: "{number}" (Length: {number.length})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#ff4444',
    backgroundColor: '#fff9f9',
  },
  errorText: {
    color: '#ff4444',
    marginTop: 10,
    fontSize: 14,
  },
  debugText: {
    marginTop: 15,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default NumberInput;