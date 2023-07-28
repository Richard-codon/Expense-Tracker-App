//import dependencies
import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';

//function for the home page screen
const HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/finance.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* App Title */}
        <Text style={styles.appTitle}>Expense Tracker</Text>

        {/* Start Budget Tracking Button */}
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('BudgetSetup')}>
          <Text style={styles.startButtonText}>Start Budget Tracking</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

//Styling for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: 'yellowgreen',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', 
  },
});

export default HomePage;
