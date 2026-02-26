import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;

  const userEmail = useSelector((state) => state.auth.userEmail);
  const safeEmail = userEmail?.replace(/\./g, ",");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders/${safeEmail}/newOrders.json`);
        const data = await res.json();

        if (data) {
          const formatted = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          setOrders(formatted.reverse());
        }
      } catch (err) {
        toast.error("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);
  
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );

  if (orders.length === 0)
    return (
      <h4 className="text-center mt-5 text-muted">
        You have no orders yet 
      </h4>
    );

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">My Orders</h3>

      {orders.map((order) => (
        <Card key={order.id} className="p-3 mb-3 shadow-sm">
          <h5 className="fw-semibold">Order ID: {order.id}</h5>
          <p className="text-muted">
            Date: {new Date(order.date).toLocaleDateString()}
          </p>

          <div>
            <strong>Items:</strong>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.cartQuantity}
                </li>
              ))}
            </ul>
          </div>

          <p className="fw-bold">Total: ₹ {order.totalAmount}/-</p>

          <p>
            <strong>Status: </strong>
            <span
              className={
                order.status === "Delivered"
                  ? "text-success"
                  : order.status === "Cancelled"
                  ? "text-danger"
                  : order.status === "Shipped"
                  ? "text-warning"
                  : "text-primary"
              }
            >
              {order.status}
            </span>
          </p>

          <p className="text-muted">
            <strong>Address:</strong> {order.address.name},{" "}
            {order.address.street}, {order.address.city},{" "}
            {order.address.pincode}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default OrdersPage;
