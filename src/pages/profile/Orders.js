import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Orders = ({onLogout}) => {
    const navigate = useNavigate();
    const [displayOrders, setDisplayOrders] = useState([])


    
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        console.log("Current accessToken", accessToken);
        if (!accessToken || accessToken === "undefined") {
            navigate("/error");
        } else {
            fetchOrders(accessToken);
        }
        }, []);

    const fetchOrders = async (accessToken) => {
        try {
            const response = await fetch("http://localhost:5000/profile/orders", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });
    
            if (response.status === 401) {
            onLogout();
            navigate("/");
            }
    
            if (!response.ok) {
            throw new Error("Error fetching orders");
            }
    
            const data = await response.json();
            const { accessToken: newAccessToken , oldOrders } = data;
            setDisplayOrders(oldOrders);
            localStorage.setItem("accessToken", newAccessToken);
            console.log("New accessToken", newAccessToken);
            
            
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
        };
    



  return (
    <div>
        {displayOrders.map((order)=>(
            <Link to={`/profile/orders/${order.order_id}`} state={{ order }}>
                <div key={order.order_id}>
                    <p>Sipariş numarası:{order.order_id}</p>
                    <p>Sipariş tarihi:{order.order_date}</p>
                    <p>Toplam fiyat : {order.total_amount}</p>
                </div>
            </Link>  
        ))}
    </div>
  )
}

export default Orders