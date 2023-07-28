// Import dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';


// Import screens (components)
import HomePage from './src/components/HomePage';
import BudgetSetup from './src/components/BudgetSetup';
import ExpenseTracker from './src/components/ExpenseTracker';
import store from './src/components/store';
import EditExpense from './src/components/EditExpense'; 
import Charts from './src/components/Charts'; 

const Stack = createStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="BudgetSetup" component={BudgetSetup} />
            <Stack.Screen
              name="ExpenseTracker"
              component={ExpenseTracker}
              initialParams={{ income: 0, budgetAmount: 0, budgetDuration: '' }}
            />
            <Stack.Screen name="EditExpense" component={EditExpense} /> 
            <Stack.Screen name="Charts" component={Charts} /> 
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
};

export default App;
