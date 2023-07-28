//import { /*useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//Main function for the Budget setup screen defined with navigation parameter and takes in navigation argument
const BudgetSetupScreen = ({ navigation }) => {
  //setting states for properties needed in the budget setup screen
  const [income, setIncome] = useState('');
  const [budget, setBudget] = useState('');
  // setting use selectors for the budget categories since it will be stored in the redux store
  const budgetCategories = useSelector((state) => state.budgetCategories);
  const [newCategory, setNewCategory] = useState('');
  const dispatch = useDispatch();

  //function to add a category
  const handleAddCategory = () => {
    if (newCategory !== '') {
      // Update Redux state by dispatching the action, after typing, the data is stored in redux store.
      dispatch({ type: 'ADD_BUDGET_CATEGORY', category: newCategory });

      // Update local state in the component, after typing and storing, it is set to an empty array.
     // setBudgetCategories([...budgetCategories, newCategory]);
      setNewCategory('');
    }
  };

 //function to remove a category
  const handleRemoveCategory = (category) => {
    //remove action from the redux store after this action, and also indicating the color of the button to be red.
    dispatch({ type: 'REMOVE_BUDGET_CATEGORY', category, buttonColor:'red',})
    
  };

  
//function to save the income and budget allocated
  const handleSave = () => {
    // Navigate to the ExpenseTracker screen and pass the necessary parameters as route params
    navigation.navigate('ExpenseTracker', {
      income,
      budgetAmount: parseFloat(budget) || 0,
      budgetCategories,
    });
  };

  
  
  
// the returning values of the components (JSX)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Budget Setup</Text>
      {/* A label for the income */}
      <Text style={styles.label}>Income:</Text>
      {/* Text input component to accept values and also display under the view  */}
      <TextInput
        style={styles.input}
        placeholder="Enter your income"
        value={income}
        onChangeText={(text) => setIncome(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Budget:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your budget"
        value={budget.toString()}
        onChangeText={(text) => setBudget(text)}
        keyboardType="numeric"
      />

     <Text style={styles.label}>Budget Categories:</Text>
      <View style={styles.categoryContainer}>
        {budgetCategories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text>{category}</Text>
            <TouchableOpacity onPress={() => handleRemoveCategory(category)}>
            <Text style={[styles.removeText, { color: category.buttonColor || 'red' }]}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.addCategoryContainer}>
        <TextInput
          style={styles.addCategoryInput}
          placeholder="Enter a budget category"
          value={newCategory}
          onChangeText={(text) => setNewCategory(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>

       
      </View>

      {/* Save button to proceed */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save to proceed</Text>
      </TouchableOpacity>
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  addCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addCategoryInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  settingsButton:{
    backgroundColor:'white',
    padding:15,
    borderRadius:2,
    alignItems:'center',
  },
  settingsButtonText:{
    color:'black',
    fontWeight:'bold',

  },
});

export default BudgetSetupScreen;