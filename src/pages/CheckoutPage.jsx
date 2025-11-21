import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Spinner, Toast, ToastContainer } from "react-bootstrap";
import AddressForm from "../components/home/AddressForm";
import AddressSelector from "../components/home/AddressSelector";
import { clearCart } from "../reduxStore/cartSlice";
import { useNavigate } from "react-router-dom";
import PleaseLogin from "../components/home/PleaseLogin";

const CheckoutPage =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addressRef = useRef(null);

    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    const userEmail = useSelector((state) => state.auth.userEmail);
    const safeEmail = userEmail?.replace(/\./g, ",");
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

    if (!userEmail) {
        return (
            <PleaseLogin />
        );
    }

    const totalAmount = cart.reduce((sum, item) =>
        sum + Number(item.price) * Number(item.cartQuantity), 0
    );

    useEffect(() => {
        if (!userEmail) return; // guest user

        fetch(`${BASE_URL}/users/${safeEmail}/addresses.json`)
            .then((res) => res.json())
            .then((data) => {if (data) setAddresses(Object.values(data));});
    }, [userEmail, safeEmail, BASE_URL]);

    const saveAddress = async (addr) => {
        await fetch(`${BASE_URL}/users/${safeEmail}/addresses.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addr),
        });

        setAddresses(prev => [...prev, addr]);
        setSelectedAddress(addr);

        setToast({
            show: true,
            message: "Address added successfully!",
            variant: "success",
            textColor: "text-white"
        });
    };

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

        try{
            const currentProducts = await Promise.all(
                cart.map((item) =>
                    fetch(`${BASE_URL}/products/${item.id}.json`)
                        .then((r) => r.json()))
            );
            for (let i = 0; i < cart.length; i++) {
                const cartItem = cart[i];
                const product = currentProducts[i];

                const available = Number(product?.quantity ?? 0);
                const want = Number(cartItem.cartQuantity ?? cartItem.quantity ?? 1);

                if (want > available) {
                    setToast({
                        show: true,
                        variant: "danger",
                        message: `Only ${available} left for "${cartItem.name}". Reduce quantity or remove it.`,
                        textColor: "text-white",
                    });
                    setLoading(false);
                    return; 
                }
            }

            for (let i = 0; i < cart.length; i++) {
                const cartItem = cart[i];
                const product =currentProducts[i];

                const available = Number(product?.quantity ?? 0);
                const want = Number(cartItem.cartQuantity ?? cartItem.quantity ?? 1);
                const newQty = Math.max(0, available - want);

                await fetch(`${BASE_URL}/products/${cartItem.id}.json`, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ quantity: newQty }),
                });
            }

            const orderData = {
                userEmail: userEmail || "guest",
                items: cart,
                totalAmount,
                address: selectedAddress,
                status: "placed",
                date: new Date().toISOString(),
            };

            await fetch(`${BASE_URL}/orders/${safeEmail}/newOrders.json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            setToast({
                show: true,
                variant: "success",
                message: "Your order has been placed successfully",
                textColor: "text-white",
            });

            dispatch(clearCart());
            navigate("/thank-you");

            setTimeout(() => navigate("/thank-you"), 600);

        } catch (err) {
            console.error("placeOrder error:", err);
            setToast({
                show: true,
                variant: "danger",
                message: "Failed to place order — try again.",
                textColor: "text-white",
            });
            setLoading(false);
            }
        }   
    
    return (<>
        <div className="container py-4">
            <ToastContainer position="top-center" className="toast-float">
                <Toast
                    bg={toast.variant}
                    show={toast.show}
                    onClose={() => setToast({ ...toast, show: false })}
                    autohide
                    delay={2500}
                >
                    <Toast.Body className={`${toast.textColor} text-center`} >{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <h3 className="mb-4">Checkout</h3>

            <div className="row">
                <div className="col-md-6">
                    <Card className="p-3">

                        {userEmail ? (
                            <AddressSelector 
                                addresses={addresses} 
                                onSelect={(addr) => setSelectedAddress(addr)}
                                onAddNew={saveAddress}
                            />) : (<AddressForm onSubmit={saveAddress} />)}

                    </Card>
                </div>

                <div className="col-md-6">
                    <Card className="p-3">
                        <h5>Order Summary</h5>

                        {cart.map((item) => (
                            <p key={item.id}>
                                {item.name} x {item.cartQuantity} = ₹{Number(item.price) * Number(item.cartQuantity)}
                            </p>
                        ))}

                        <h4>Total: ₹{totalAmount}</h4>
                        <p className="text-muted">Payment mode only cash on Delivery</p>

                        <Button
                            onClick={placeOrder}
                            className="mt-2 w-auto d-block ms-auto px-4 mt-3"
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