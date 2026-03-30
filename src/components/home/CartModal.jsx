import { Modal, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../reduxStore/cartSlice";
import { useNavigate } from "react-router-dom";

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

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

  const handleDecrease = (item) => {
    if (item.cartQuantity === 1) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="cart-modal">
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
          <div className="cart-items-list">
            {items.map((item) => (
              <div className="cart-item"
                key={item.id}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-img"
                  onError={(e) => { e.target.src = "https://placehold.co/72x72?text=?"; }}
                  style={{
                    width: "72px",
                    height: "72px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                />

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <div className="d-flex align-items-center gap-2">
                    <span className="cart-item-qty-label">
                      ₹{Number(item.price).toLocaleString()} x {item.cartQuantity}
                    </span>
                  </div>
                  <span className="cart-item-price">
                    ₹{(item.price * item.cartQuantity).toLocaleString()}
                  </span><br />
                  {item.cartQuantity >= item.maxQuantity && (
                    <small className="text-danger" style={{ fontSize: "0.75rem" }}>
                      Max stock reached
                    </small>
                  )}
                </div>
                <div className="cart-item-controls">
                  <button
                    className="cart-qty-btn cart-qty-btn--minus"
                    onClick={() => handleDecrease(item)}
                    aria-label="Decrease quantity"> - </button>

                  <span className="cart-qty-count">
                    {item.cartQuantity}
                  </span>
                  
                  <button
                    className="cart-qty-btn cart-qty-btn--plus"
                    disabled={item.cartQuantity >= item.maxQuantity}
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    aria-label="Increase quantity"> + </button>

                  <button
                    className="cart-delete-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label="Remove item"> <TrashIcon /> </button>

                </div>
              </div>
            ))}</div>
        )}
      </Modal.Body>

      {items.length > 0 && (
        <Modal.Footer className="cart-modal-footer px-4 py-3 border-top">
          <div className="cart-total">
            <span className="text-muted me-1" style={{ fontSize: "0.9rem" }}>Total:</span>
            <span className="fw-bold fs-5">₹{total.toLocaleString()}/-</span>
          </div>
          <div className="cart-footer-actions">
            <Button variant="outline-secondary" onClick={onHide}>
              Continue Shopping
            </Button>
            <Button variant="primary" className="fw-semibold" onClick={handleCheckout}>
              Proceed to checkout
            </Button>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CartModal;