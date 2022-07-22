import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/deliveryAPI';

function CardOrder() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const orderFunction = async () => {
      const response = await getOrders();

      setOrder(response);
    };
    orderFunction();
  }, []);
  console.log(order);
  return (
    <div>
      <section>
        {
          order.map(({ id, status, totalPrice, saleDate }) => (
            <div key={ id }>
              <span>{id}</span>
              <span>{status}</span>
              <span>{totalPrice}</span>
              <span>{saleDate}</span>
            </div>
          ))
        }
      </section>
    </div>
  );
}

export default CardOrder;
