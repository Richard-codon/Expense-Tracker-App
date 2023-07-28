import { createStore } from 'redux';

const initialState = {
  budgetCategories: [],//Initialize budget categories an empty array
  expenses: [], // Initialize expenses as an empty array
  nextExpenseId : 1, 
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BUDGET_CATEGORY':
      return {
        ...state,
        budgetCategories: [...state.budgetCategories, action.category],
      };
    case 'REMOVE_BUDGET_CATEGORY':
      return {
        ...state,
        budgetCategories: state.budgetCategories.filter(
          (category) => category !== action.category
        ),
      };
      case 'ADD_EXPENSE':
        const newExpense = {
          ...action.expense,
          id: state.nextExpenseId, // Assign a unique id to the new expense
        };
        return {
          ...state,
          expenses: [...state.expenses, newExpense],
          nextExpenseId: state.nextExpenseId + 1, // Increment the next available id
        };
  
      case 'UPDATE_EXPENSE':
        return {
          ...state,
          expenses: state.expenses.map((expenseItem) =>
            expenseItem.id === action.expense.id ? { ...action.expense } : expenseItem
          ),
        };
  
    default:
      return state;
  }
};

const store = createStore(budgetReducer);

export default store;

