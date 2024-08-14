import React, { useState } from 'react';
import { Button, Container, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './CartPage.css';

const CartPage = ({ cartItems, updateQuantity, removeItem, placeOrder }) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    await placeOrder();
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="cart-page">
      <Container className="main-container mt-4">
        <h2 className="text-center mb-4">Your Cart</h2>
        {orderConfirmed && (
          <Alert variant="success" className="order-confirmed-message">
            <b></b> Order confirmed! Food will be arriving soon!
          </Alert>
        )}
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="cart-table-header">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={require(`../assets/${item.name.toLowerCase()}.png`)} alt={item.name} width="50" />
                    {' '}
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-control">
                      <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</Button>{' '}
                      {item.quantity}{' '}
                      <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeItem(item.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}></td>
                <td className="total-price">Total: ${calculateTotal().toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        )}
        {cartItems.length > 0 && (
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handlePlaceOrder} className="place-order-btn">
              Place Order
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CartPage;