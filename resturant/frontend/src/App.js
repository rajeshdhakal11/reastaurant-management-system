import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeCartItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const placeOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItems),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]);
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <Router>
      <div>
        <Navbar cartItemCount={cartItems.length} />
        <Container className="mt-4 app-container">
          <Routes>
            <Route path="/" element={<HomePage addToCart={addToCart} cartItems={cartItems} />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateCartItemQuantity}
                  removeItem={removeCartItem}
                  placeOrder={placeOrder}
                />
              }
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;