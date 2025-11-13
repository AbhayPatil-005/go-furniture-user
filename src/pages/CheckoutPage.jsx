import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Spinner, Toast, ToastContainer } from "react-bootstrap";
import AddressForm from "../components/address/AddressForm";
import AddressSelector from "../components/address/AddressSelector";
import { clearCart } from "../reduxStore/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addressRef = useRef(null);

    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    const userEmail = useSelector((state) => state.auth.userEmail);
    const cart = useSelector((state) => state.cart.items);

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "",
        textColor: "",
    });

    const totalAmount = cart.reduce((sum, item) =>
        sum + item.price * item.qty, 0
    );

    useEffect(() => {
        if (!userEmail) return; // guest user

        const safeEmail = userEmail.replace(/\./g, ",");
        fetch(`${BASE_URL}/users/${safeEmail}/addresses.json`)
            .then((res) => res.json())
            .then((data) => {if (data) setAddresses(Object.values(data));});
    }, []);

    const placeOrder = async () => {
        if (!selectedAddress) {
            setToast({
                show: true,
                variant: "danger",
                message: "Please select or add a delivery address.",
                textColor: "text-white",
            });

            addressRef.current?.scrollIntoView({ behavior: "smooth" });
            return;
        }
        setLoading(true);

        const orderData = {
            userEmail: userEmail || "guest",
            items: cart,
            totalAmount,
            address: selectedAddress,
            status: "placed",
            date: new Date().toISOString(),
        };
        await fetch(`${BASE_URL}/orders.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        dispatch(clearCart());
        navigate("/thankyou");
    }
    return (<>
        <div className="container py-4">
            <ToastContainer position="top-center" className="mt-3">
                <Toast
                    bg={toast.variant}
                    show={toast.show}
                    onClose={() => setToast({ ...toast, show: false })}
                    autohide
                    delay={2500}
                >
                    <Toast.Body className={toast.textColor}>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <h3 className="mb-4">Checkout</h3>

            <div className="row">
                <div className="col-md-6">
                    <Card className="p-3">

                        {userEmail ? (<AddressSelector
                            addresses={addresses}
                            onSelect={(addr) => setSelectedAddress(addr)}
                        />) : (<AddressForm onSubmit={(addr) => setSelectedAddress(addr)} />)}

                    </Card>
                </div>

                <div className="col-md-6">
                    <Card className="p-3">
                        <h5>Order Summary</h5>

                        {cart.map((item) => (
                            <p key={item.id}>
                                {item.name} x {item.qty} = ₹{item.price * item.qty}
                            </p>
                        ))}

                        <h4>Total: ₹{totalAmount}</h4>

                        <Button
                            onClick={placeOrder}
                            className="w-100 mt-3"
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" /> : "Place Order (COD)"}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    </>)
}
export default CheckoutPage;