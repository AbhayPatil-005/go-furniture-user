import { Modal, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity} from "../../reduxStore/cartSlice";      
import { useNavigate } from "react-router-dom";

const CartModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.cartQuantity, 0);

  const handleCheckout = () => {
    onHide();
    navigate("/checkout");
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="fw-bold fs-5">
          Your Cart{" "}
          {items.length > 0 && (
            <Badge bg="primary" className="ms-2 fs-6">
              {items.reduce((sum, i) => sum + i.cartQuantity, 0)}
            </Badge>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{ maxHeight: "60vh", overflowY: "auto" }}
        className="px-4"
      >
        {items.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "3.5rem" }}>🛒</div>
            <p className="text-muted mt-3 mb-0">Your cart is empty.</p>
            <p className="text-muted">
              Browse our collection and add something you love!
            </p>
            <Button
              variant="outline-primary"
              className="mt-2"
              onClick={onHide}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center gap-3 py-3 border-bottom"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              />

              <div className="flex-grow-1 min-width-0">
                <p
                  className="fw-semibold mb-1 text-truncate"
                  style={{ fontSize: "0.95rem" }}
                >
                  {item.name}
                </p>
                <p className="text-success fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                  ₹{(item.price * item.cartQuantity).toLocaleString()}
                </p>
                {item.cartQuantity >= item.maxQuantity && (
                  <small className="text-danger">Max stock reached</small>
                )}
              </div>

              <div className="d-flex align-items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "28px", height: "28px", padding: 0 }}
                  disabled={item.cartQuantity === 1}
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  −
                </Button>
                <span className="fw-semibold" style={{ minWidth: "20px", textAlign: "center" }}>
                  {item.cartQuantity}
                </span>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "28px", height: "28px", padding: 0 }}
                  disabled={item.cartQuantity >= item.maxQuantity}
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-1"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </Modal.Body>

      {items.length > 0 && (
        <Modal.Footer className="d-flex justify-content-between align-items-center border-top px-4">
          <div>
            <span className="text-muted me-2">Total:</span>
            <span className="fw-bold fs-5">₹{total.toLocaleString()}/-</span>
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={onHide}>
              Continue Shopping
            </Button>
            <Button variant="primary" className="fw-semibold" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CartModal;