import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
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

    if (!userEmail) {
        return (
            <PleaseLogin />
        );
    }

    const totalAmount = cart.reduce((sum, item) =>
        sum + Number(item.price) * Number(item.cartQuantity), 0
    );

    useEffect(() => {
        if (!userEmail) return; 

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

        toast.success("Address added successfully");
    };

    const placeOrder = async () => {
        if (!selectedAddress) {
            toast.warning("Please select or add a delivery address.");
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
                    toast.warning(`Only ${available} left for "${cartItem.name}". Reduce quantity or remove it.`)
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

            toast.success("Your order has been placed successfully");

            dispatch(clearCart());
            navigate("/thank-you");

        } catch (err) {
            console.error("placeOrder error:", err);
            toast.error("Failed to place order — try again.")
            setLoading(false);
            }
        }   
    
    return (<>
        <div className="container py-4">
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