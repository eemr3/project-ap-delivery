import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getOrders } from '../services/deliveryAPI';

function CardOrder() {
  const [order, setOrder] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useHistory();

  const orderFunction = async () => {
    const response = await getOrders();
    console.log(response);
    setOrder(response);
  };

  useEffect(() => {
    orderFunction();
    const { role } = JSON.parse(localStorage.getItem('user'));
    setUserRole(role);
  }, []);

  const parseDate = (date) => {
    const newDate = date.split('T')[0];

    return newDate.split('-').reverse().join('/');
  };

  return (
    <div>
      <section>
        {
          order.map(({
            id, status, totalPrice, saleDate, deliveryAddress, deliveryNumber,
          }) => (
            <button
              type="button"
              key={ id }
              onClick={ () => { navigate.push(`/${userRole}/orders/${id}`); } }
              onKeyDown={ () => { navigate.push(`/${userRole}/orders/${id}`); } }
            >
              <span
                data-testid={ `seller_orders__element-order-id-${id}` }
              >
                {id}
              </span>
              <span
                data-testid={ `seller_orders__element-delivery-status-${id}` }
              >
                {status}
              </span>
              <span
                data-testid={ `seller_orders__element-card-price-${id}` }
              >
                {totalPrice.replace('.', ',')}
              </span>
              <span
                data-testid={ `seller_orders__element-order-date-${id}` }
              >
                {parseDate(saleDate)}
              </span
              >
              {
                userRole === 'seller' ? (
                  <span
                    data-testid={ `seller_orders__element-card-address-${id}` }
                  >
                    {`${deliveryAddress}, ${deliveryNumber}`}
                  </span>
                ) : null
              }
            </button>
          ))
        }
      </section>
    </div>
  );
}

export default CardOrder;
