import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import storage from '../context/context';
import '../styles/cardProducts.css';

function CardProduct({ name, price, url, id }) {
  const [unity, setUnity] = useState(0);
  const [product, setProduct] = useState({});
  const { newItem, cart } = useContext(storage);

  const addInCart = () => {
    setUnity(unity + 1);
    setProduct({
      name,
      productId: id,
      quantity: unity + 1,
      unitPrice: price.replace(/\./, ','),
      subTotal: parseFloat(price * (unity + 1)).toFixed(2).replace(/\./, ','),
    });
  };

  const removeInCart = () => {
    if (unity !== 0) {
      setUnity(unity - 1);
      setProduct({
        name,
        productId: id,
        quantity: unity - 1,
        unitPrice: price,
        subTotal: parseFloat(price * (unity - 1)).toFixed(2),
      });
    }
  };

  useEffect(() => {
    const productFind = cart.find((({ productId }) => productId === id));
    if (productFind) setUnity(productFind.quantity);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (product.productId) {
      newItem(product);
    }
  }, [product]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = ({ target }) => {
    const convertValue = Number(target.value);

    if (Number.isNaN(convertValue)) {
      target.value = unity;
    } else {
      setProduct({
        name,
        productId: id,
        quantity: convertValue,
        unitPrice: price,
        subTotal: parseFloat(price * convertValue).toFixed(2),
      });
      setUnity(Number(target.value));
    }
  };

  return (
    <div
      className="card-product"
    >
      <img
        className="card-image"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ url }
        alt="product"
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{ name }</p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        { price.replace(/\./, ',') }
      </p>
      <div className="counter">
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ removeInCart }
          type="button"
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="text"
          name="number"
          value={ unity }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ addInCart }
        >
          +
        </button>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CardProduct;
