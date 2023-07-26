import React from 'react'
import { useLocation } from 'react-router-dom'

const ASingleOrder = () => {
    const location = useLocation();
    const {order} = location.state;
    console.log('suanki order' , order);
    const {order_id} = order;

    // order ile istek atıcaz






    



  return (
    <div>{order.order_id}</div>
  )
}

export default ASingleOrder