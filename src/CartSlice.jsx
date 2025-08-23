import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize cart with an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push(action.payload); // Add new item with quantity
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity = action.payload.quantity; // Update quantity
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload); // Remove item by name
    },
  },
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer; // Export the reducer for the store