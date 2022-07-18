import React, { useEffect, useState } from 'react';
// import '../styles/Checkout.css';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSellers, createSale } from '../services/deliveryAPI';

function Checkout() {
  const [ordered, setOrdered] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [order, setOrder] = useState({
    sellerId: '', deliveryAddress: '', deliveryNumber: '',
  });
  const navigate = useHistory();

  const getSellersFromAPI = async () => {
    const data = await getSellers();
    setSellers(data);
    setOrder({
      ...order, sellerId: data[0].id,
    });
  };

  const handleClick = async () => {
    const totalPrice = ordered
      .reduce((acc, crr) => acc + Number(crr.subTotal.replace(/,/, '.')), 0)
      .toFixed(2);
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const products = JSON.parse(localStorage.getItem('cart'));
    const data = { ...order, totalPrice, userId: id, status: 'Pendente', products };
    // setToken(token);
    const result = await createSale({ data, token });
    const { data: { id: orderId } } = result;
    console.log(result);
    navigate(`../customer/orders/${orderId}`);
  };

  const removeItem = (id) => {
    const updateList = ordered.filter(({ productId }) => productId !== id);
    setOrdered(updateList);
    localStorage.setItem('cart', JSON.stringify(updateList));
  };

  useEffect(getSellersFromAPI, []);

  useEffect(() => {
    setOrdered(JSON.parse(localStorage.getItem('cart')));
  }, []);

  return (
    <main>
      <Navbar />
      <h1 className=''>Finalizar pedido</h1>
      <table border="1">
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover item</th>
        </tr>
        {
          ordered.map(({ name, productId, quantity, unitPrice, subTotal }, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td data-testid={ `customer_checkout__element-order-table-name-${index}` }>
                { name }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                { quantity }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { unitPrice }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { subTotal }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-remove-${index}`
                }
              >
                <button type="button" onClick={ () => removeItem(productId) }>
                  Remover
                </button>
              </td>
            </tr>
          ))
        }
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {
          `Total: R$ ${ordered
            .reduce((acc, crr) => acc + Number(crr.subTotal.replace(/,/, '.')), 0)
            .toFixed(2)
            .replace(/\./, ',')
          }`
        }
      </p>

      <h1>Detalhes e Endereço para Entrega</h1>
      <label htmlFor="seller">
        P.Vendedora responsável
        <select
          id="seller"
          data-testid="customer_checkout__select-seller"
          defaultValue={ sellers[0] }
          onChange={
            ({ target }) => setOrder({
              ...order, sellerId: Number(target.options[target.selectedIndex].value),
            })
          }
        >
          {
            sellers.map(({ name, id }, i) => (
              <option key={ i } value={ id }>{ name }</option>
            ))
          }
        </select>
      </label>

      <label htmlFor="address">
        Endereço
        <input
          onChange={ ({ target }) => setOrder(
            {
              ...order, deliveryAddress: target.value,
            },
          ) }
          type="text"
          id="address"
          placeholder="Rua do bairro"
          data-testid="customer_checkout__input-address"
        />
      </label>

      <label htmlFor="number">
        Número
        <input
          onChange={ ({ target }) => setOrder(
            {
              ...order, deliveryNumber: target.value,
            },
          ) }
          type="text"
          id="number"
          placeholder="198"
          data-testid="customer_checkout__input-addressNumber"
        />
      </label>

      <button
        onClick={ handleClick }
        type="button"
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar pedido
      </button>
    </main>
  );
}

export default Checkout;
