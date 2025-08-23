import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // Import the cart reducer from CartSlice

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    cart: cartReducer, // Register the cart slice under the 'cart' key in the state
  },
});

export default store; // Export the store for use in the app