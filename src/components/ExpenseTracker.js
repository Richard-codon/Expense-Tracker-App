import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

const ExpenseTracker = ({ navigation, route }) => {
  const { income, budgetAmount, budgetDuration } = route.params;
  const budgetCategories = useSelector((state) => state.budgetCategories);
  const expenses = useSelector((state) => state.expenses);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');//I can initially set to 0 as well, but prefer empty container 
  const [expenseDescription, setExpenseDescription] = useState('');
  const [budgetDurationInput, setBudgetDurationInput] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const deleteCategory = (category) => {
    dispatch({ type: 'REMOVE_BUDGET_CATEGORY', category });
  };

  const calculateRemainingBudget = () => {
    let totalExpenses = expenses.reduce((total, expense) => total + Math.abs(expense.amount), 0);
    return budgetAmount - totalExpenses;
  };

  const handleAddExpense = () => {
    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
      const newExpense = {
        name: expenseName,
        amount: expenseAmount,
        description: expenseDescription,
        date: new Date().toISOString().split('T')[0],
      };
      setExpenseName('');
      setExpenseAmount(0);
      setExpenseDescription('');
      dispatch({ type: 'ADD_EXPENSE', expense: newExpense });
    }
  };

  const handleBudgetDurationChange = (text) => {
    setBudgetDurationInput(text);
  };

  const handleDateChange = (event, selected) => {
    setBudgetDurationInput(false);
    if (selected) {
      setSelectedDate(selected);
    }
  };

  const handleEditExpense = (expense) =>{
    navigation.navigate('EditExpense', {expense});

  }

  const handleCheckCharts = () => {
    const chartData = prepareChartData(budgetCategories, expenses);
    navigation.navigate('Charts', { chartData });
  };

const prepareChartData = (budgetCategories, expenses) => {
  // For now, I'm using dummy data to demonstrate the chart
  const labels = budgetCategories.map((category) => category);
  const data = budgetCategories.map((category) => {
    // Calculate the total expense for each budget category
    const totalExpense = expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + Math.abs(expense.amount), 0);
    return totalExpense;
  });

  const chartData = {
    labels,
    data,
  };

  return chartData;
};



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>
      <Text>
        Income: <Text style={styles.amount}>${income}</Text>
      </Text>
      <Text>
        Budget: <Text style={styles.amount}>${budgetAmount.toFixed(2)}</Text>
      </Text>
      <Text>
        Budget Duration: <Text style={styles.budgetDuration}>{budgetDuration}</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Expense Name"
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Expense Amount"
        value={expenseAmount.toString()}
        onChangeText={(text) => setExpenseAmount(parseFloat(text))}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Expense Description"
        value={expenseDescription}
        onChangeText={(text) => setExpenseDescription(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Budget Duration"
        value={budgetDurationInput}
        onChangeText={handleBudgetDurationChange}
      />

      <TouchableOpacity style={styles.addExpenseButton} onPress={handleAddExpense}>
        <Text style={styles.addExpense}>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkChartButton} onPress={handleCheckCharts}>
        <Text style={styles.checkCharts}>See Charts</Text>
      </TouchableOpacity>

      <Text style={styles.subheader}>Expenses:</Text>
      {expenses.map((expense, index) => (
        <View key={index} style={styles.expenseItem}>
          <Text>{expense.name}</Text>
          <Text>${expense.amount.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => handleEditExpense(expense)}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.subheader}>
        Remaining Budget: <Text style={styles.amount}>${calculateRemainingBudget().toFixed(2)}</Text>
      </Text>

      <Text style={styles.subheader}>Budget Categories:</Text>
      {budgetCategories.map((category, index) => (
        <View key={index} style={styles.categoryItem}>
          <Text>{category}</Text>
          <TouchableOpacity onPress={() => deleteCategory(category)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>Select Date: {selectedDate.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker value={selectedDate} mode="date" display="default" onChange={handleDateChange} />
      )}

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
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  amount: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    padding: 15,
    borderRadius: 5,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  removeText: {
    color: 'red',
  },
  budgetDuration: {
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  datePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editText: {
    color: 'blue',
  },
  addExpenseButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addExpense: {
    fontSize: 20,
    color: 'white',
  },
  checkChartButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
  },
  checkCharts: {
    fontSize: 20,
    color: 'blue',
  },
});

export default ExpenseTracker; 