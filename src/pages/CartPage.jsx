import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../reduxStore/cartSlice";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartPage=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const total = items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
    return(
            <div className="container py-4 w-50">
                <h3 className="mb-4">Your Cart</h3>

                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {items.map((item) => (
                            <Card className="p-3 mb-3" key={item.id}>
                                <div className="d-flex align-items-center">
                                    <img src={item.imageUrl} width={80} className="me-3" />
                                    <div>
                                        <h5>{item.name}</h5>
                                        <p>₹{item.price}</p>
                                        <p>Quantity: {item.cartQuantity}</p>
                                        {item.cartQuantity >= item.maxQuantity && (
                                            <small className="text-danger">
                                                Maximum available stock reached
                                            </small>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-center gap-2 ms-auto">
                                        <Button
                                            variant="outline-danger"
                                            size="sm" className="fw-bolder rounded-5 px-3"
                                            disabled={item.cartQuantity === 1}
                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                        >
                                            -
                                        </Button>
                                        <span className="px-2">{item.cartQuantity}</span>
                                        <Button
                                            variant="outline-success"
                                            size="sm" className="fw-bolder rounded-5 px-3"
                                            disabled={item.cartQuantity >= item.maxQuantity}
                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                        >
                                            +
                                        </Button>
                                    
                                    <Button
                                        className="ms-auto"
                                        variant="danger"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        <h4>Total: ₹ {total}/-</h4>

                        <Button variant="primary" className="mt-3" onClick={()=>navigate("/checkout")}>
                            Proceed to Checkout
                        </Button>
                    </>
                )}
            </div>
    )
}

export default CartPage;