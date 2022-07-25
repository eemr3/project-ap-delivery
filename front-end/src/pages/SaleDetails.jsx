import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { getOrder, updateStatus } from '../services/deliveryAPI';

function SaleDetails({ match }) {
  const [order, setOrder] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { id } = match.params;

  const updateOrder = async () => {
    const newOrder = await getOrder(id);

    setOrder(newOrder);
  };

  const parseDate = (date) => {
    const newDate = date.split('T')[0];

    return newDate.split('-').reverse().join('/');
  };

  const calculateTotal = () => {
    if (order) {
      return order.products.reduce((total, product) => {
        const subTotal = product.price * product.SaleProduct.quantity;
        return subTotal + total;
      }, 0);
    }

    return 0;
  };

  const onUpdateStatus = async () => {
    await updateStatus(order.id, 'Entregue');
    updateOrder();
    setIsButtonActive(true);
  };

  useEffect(() => {
    updateOrder();
  }, []);

  useEffect(() => {
    if (order && order.status && order.status === 'Em Trânsito') {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }
  }, [order]);

  return (
    <>
      <Navbar />
      <div>
        <h1>Detalhes do Pedido</h1>
        <div>
          <div
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            PEDIDO
            {' 000'}
            {order && order.id}
          </div>
          <div
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P. Vend:
            {' '}
            {order && order.seller.name}
          </div>
          <div
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {order && parseDate(order.saleDate)}
          </div>
          <div
            data-testid={ 'customer_order_details__element-'
            + 'order-details-label-delivery-status' }
          >
            {order && order.status}
          </div>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            onClick={ onUpdateStatus }
            disabled={ isButtonActive }
          >
            Marcar como entregue

          </button>
        </div>
        <table border="1">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
          {
            order && order.products.map((
              { name, SaleProduct: { quantity }, price },
              index,
            ) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `
                  customer_order_details__element-order-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `
                  customer_order_details__element-order-table-quantity-${index}` }
                >
                  { quantity }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  { price }
                </td>
                <td
                  data-testid={
                    `customer_order_details__element-order-table-sub-total${index}`
                  }
                >
                  { (price * quantity).toFixed() }
                </td>
              </tr>
            ))
          }
        </table>
        <div>
          Total:
          {' '}
          R$
          <span
            data-testid="customer_order_details__element-order-total-price"
          >
            { calculateTotal().toFixed(2).replace('.', ',') }
          </span>
        </div>
      </div>
    </>
  );
}

SaleDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.objectOf({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SaleDetails;
