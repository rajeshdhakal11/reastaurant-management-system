import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCartPlus, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage({ addToCart, cartItems }) {
  const [menuItems, setMenuItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchMenu();
  }, []);

  const getQuantityInCart = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  return (
    <div className="home-page">
      <Container className="main-container menu-container mt-4">
        <h2 className="text-center mb-4 display-4 menu-title">Our Delicious Menu</h2>
        <Row>
          {menuItems.map(item => (
            <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="mb-3 menu-item-card">
                <div className="card-image-container">
                  <Card.Img variant="top" src={require(`../assets/${item.name.toLowerCase()}.png`)} />
                  <Button
                    className="favorite-btn"
                    onClick={() => toggleFavorite(item.id)}
                    variant={favorites.includes(item.id) ? 'danger' : 'outline-danger'}
                  >
                    <FaHeart />
                  </Button>
                </div>
                <Card.Body>
                  <Card.Title className="text-center">{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text className="text-center price">${item.price.toFixed(2)}</Card.Text>
                  <div className="d-grid">
                    <Button
                       variant="primary"
                       onClick={() => addToCart(item)}
                       className="add-to-cart-btn"
                    >
                      <FaCartPlus className="me-2" />
                      Add to Cart
                      {getQuantityInCart(item.id) > 0 && (
                        <span className="quantity-badge">{getQuantityInCart(item.id)}</span>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="success"
            as={Link}
            to="/cart"
            className="go-to-cart-btn"
          >
            <FaShoppingCart className="me-2" />
            Go to Cart
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;