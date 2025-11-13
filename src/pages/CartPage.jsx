import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../reduxStore/cartSlice";
import { Button, Card } from "react-bootstrap";


const CartPage=()=>{
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const total = items.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

    return(
        <>
            <div className="container py-4">
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
                                    </div>
                                    <Button
                                        className="ms-auto"
                                        variant="danger"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </Card>
                        ))}

                        <h4>Total: ₹{total}</h4>

                        <Button variant="primary" className="mt-3">
                            Proceed to Checkout
                        </Button>
                    </>
                )}
            </div>
        </>
    )
}

export default CartPage;