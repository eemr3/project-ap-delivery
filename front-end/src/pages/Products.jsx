import React, { useEffect, useState } from 'react';
import CardProduct from '../components/CardProduct';
import CartButton from '../components/CartButton';
import Navbar from '../components/Navbar';
import Provider from '../context/provider';
import { getProducts } from '../services/deliveryAPI';
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <Provider>
        <Navbar />
        <section className="products-section">
          {
            products.map(({ name, price, urlImage, id }, index) => (
              <CardProduct
                key={ index }
                id={ id }
                name={ name }
                price={ price }
                url={ urlImage }
              />
            ))
          }
          <CartButton />
        </section>
      </Provider>
    </main>
  );
}

export default Products;
