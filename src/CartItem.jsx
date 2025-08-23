import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const cost = parseFloat(item.cost.substring(1)); // Extract numeric value from cost string (e.g., "$10.00")
      total += cost * item.quantity; // Multiply cost by quantity and add to total
    });
    return total.toFixed(2); // Return total formatted to 2 decimal places
  };

  // Handle continue shopping by calling the parent component's function
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Handle incrementing item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is greater than 1, decrease by 1
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity would drop to 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for a single item based on quantity
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1)); // Extract numeric value from cost string
    return (cost * item.quantity).toFixed(2); // Return subtotal formatted to 2 decimal places
  };

  // Handle checkout (placeholder for future implementation)
  const handleCheckoutShopping = (e) => {
    alert('Coming Soon .... ');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name}/>
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}
      </div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem; 