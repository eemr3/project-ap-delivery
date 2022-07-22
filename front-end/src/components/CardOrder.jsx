import React, { useEffect, useState } from 'react';
import {getOrders} from '../services/deliveryAPI'
// import PropTypes from 'prop-types';


function CardOrder() {
  
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const orderFunction = async () => {
        const response = await getOrders()
        
        setOrder(response)
    }
    orderFunction()
  }, []);
  console.log(order);
  return (
    <div>
        <section>
            {
        order.map((order) => (
            <div>
                <span>{order.id}</span>
                <span>{order.status}</span>
                <span>{order.totalPrice}</span>
                <span>{order.saleDate}</span>
            </div>
        ))
            }
        </section>
    </div>
  );
}

// CardOrder.propTypes = {
//   status: PropTypes.string.isRequired,
//   totalPrice: PropTypes.number.isRequired,
//   saleDate: PropTypes.number.isRequired,
// };

export default CardOrder;
