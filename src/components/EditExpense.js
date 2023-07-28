//import dependecies 
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

//Main function for the edit expense screen
const EditExpense = ({ route, navigation }) => {
  const { expense} = route.params;
  const dispatch = useDispatch();
  // define states for the properties 
  const [expenseName, setExpenseName] = useState(expense.name);
  const [expenseAmount, setExpenseAmount] = useState(expense.amount.toString());
  const [expenseDescription, setExpenseDescription] = useState(expense.description);
  // function to handle save changes button after edits have being made
  const handleSaveChanges = () => {
    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
      const updatedExpense = {
        ...expense,
        name: expenseName,
        amount: parseFloat(expenseAmount),
        description: expenseDescription,
      };
      dispatch({ type: 'UPDATE_EXPENSE', expense: updatedExpense });
      navigation.goBack();
    }
  };
  
 // Returning values of the function(JSX)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        value={expenseAmount}
        onChangeText={(text) => setExpenseAmount(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expense Description"
        value={expenseDescription}
        onChangeText={(text) => setExpenseDescription(text)}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default EditExpense;