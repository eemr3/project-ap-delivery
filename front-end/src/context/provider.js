import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import storage from './context';

function Provider({ children }) {
  const [cart, setCart] = useState([]);

  const newItem = (item) => {
    if (cart.some(({ productId }) => productId === item.productId)) {
      const data = cart.filter(({ productId }) => productId !== item.productId);
      const product = cart.find(({ productId }) => productId === item.productId);
      product.quantity = item.quantity;
      product.subTotal = item.subTotal;

      setCart([...data, product]);
    } else {
      setCart([...cart, item]);
    }
  };

  useEffect(() => {
    const cartStored = JSON.parse(localStorage.getItem('cart'));
    if (cartStored) setCart(cartStored);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <storage.Provider value={ { cart, newItem } }>
      { children }
    </storage.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
