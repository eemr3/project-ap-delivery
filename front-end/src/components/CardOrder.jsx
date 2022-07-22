import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getOrders } from '../services/deliveryAPI';

function CardOrder() {
  const [order, setOrder] = useState([]);
  const navigate = useHistory();

  useEffect(() => {
    const orderFunction = async () => {
      const response = await getOrders();

      setOrder(response);
    };
    orderFunction();
  }, []);

  const parseDate = (date) => {
    const newDate = date.split('T')[0];

    return newDate.split('-').reverse().join('/');
  };

  return (
    <div>
      <section>
        {
          order.map(({ id, status, totalPrice, saleDate }) => (
            <button
              type="button"
              key={ id }
              onClick={ () => { navigate.push(`/customer/orders/${id}`); } }
              onKeyDown={ () => { navigate.push(`/customer/orders/${id}`); } }
            >
              <span
                data-testid={ `customer_orders__element-order-id-${id}` }
              >
                {id}
              </span>
              <span
                data-testid={ `customer_orders__element-delivery-status-${id}` }
              >
                {status}
              </span>
              <span
                data-testid={ `customer_orders__element-card-price-${id}` }
              >
                {totalPrice.replace('.', ',')}
              </span>
              <span
                data-testid={ `customer_orders__element-order-date-${id}` }
              >
                {parseDate(saleDate)}
              </span>
            </button>
          ))
        }
      </section>
    </div>
  );
}

export default CardOrder;
