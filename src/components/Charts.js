import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const Charts = ({ route }) => {
  const { chartData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Charts</Text>
      <BarChart
        data={{
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.data,
            },
          ],
        }}
        width={350}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Charts;
