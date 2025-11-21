import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logout } from "../reduxStore/authSlice";
import { clearCart } from "../reduxStore/cartSlice";
import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AddressForm from "../components/home/AddressForm";

const ProfilePage=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    const userEmail = useSelector((state) => state.auth.userEmail);
    const safeEmail = userEmail?.replace(/\./g, ",");

    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false); 
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "",
        textColor: ""
    });

    useEffect(()=>{
        if(!userEmail) return;

        fetch(`${BASE_URL}/users/${safeEmail}/addresses.json`)
            .then((res)=>res.json())
            .then((data)=>{
                if(data) {
                    setAddresses(
                        Object.entries(data).map(([id,val])=>({id, ...val})));
                }
            });
    },[userEmail, BASE_URL, safeEmail]);

    const deleteAddress = async(id) =>{
        await fetch(`${BASE_URL}/users/${safeEmail}/addresses/${id}.json`,{
            method:"DELETE"
        });

        setAddresses((prev)=>prev.filter((adr)=>adr.id !== id ));
        setToast({
            show:true,
            message:"Address deleted successfully",
            variant:"danger",
            textColor:"text-white"
        });
    };

    const handleEdit = (addr)=>{
        setEditingAddress(addr);
        setIsAddingNew(false);
    };

    const saveEditedAddress=async(id, updatedAddress)=>{
        setLoading(true);

        await fetch(`${BASE_URL}/users/${safeEmail}/addresses/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAddress)
        });

        setAddresses((prev)=>
            prev.map((a)=>(a.id === id?{...a,...updatedAddress}:a))
        );

        setLoading(false);
        setEditingAddress(null); 

        setToast({
            show:true,
            message:"Address updated successfully",
            variant:"success",
            textColor:"text-white"
        });
    };
    const saveNewAddress = async (newAddress) => {
        setLoading(true);

        const res = await fetch(`${BASE_URL}/users/${safeEmail}/addresses.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAddress),
        });

        const data = await res.json();
        const newId = data.name; 

        setAddresses((prev) => [...prev, { id: newId, ...newAddress }]);

        setLoading(false);
        setIsAddingNew(false);

        setToast({
            show: true,
            message: "Address added successfully!",
            variant: "success",
            textColor: "text-white"
        });
    };

    const handleLogout =()=>{
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="main-content">
                <div className="container py-4 w-50">
                    <ToastContainer position="top-center" className="toast-float">
                        <Toast
                            bg={toast.variant}
                            show={toast.show}
                            onClose={() => setToast({ ...toast, show: false })}
                            autohide
                            delay={2500}
                        >
                            <Toast.Body className={toast.textColor + " text-center"}>
                                {toast.message}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>

                    <h3 className="mb-4">
                        My Profile
                    </h3>

                    <Card className="p-3 mb-4">
                        <h5>Email</h5>
                        <p className="text-dark">{userEmail}</p>
                    </Card>

                    <div>
                        <h5>
                            Your Addresses
                        </h5>
                        <Button
                            variant="outline-primary"
                            onClick={() => {
                                setIsAddingNew(true);
                                setEditingAddress(null);
                            }}>
                            + Add New Address
                        </Button>
                    </div>
                    <br />

                    {isAddingNew && (
                        <Card className="d-flex p-3 mb-3">
                            <AddressForm
                                initialData={null}
                                onSubmit={saveNewAddress}
                            />
                            <Button
                                variant="outline-danger"
                                className="mt-2 w-auto d-block mx-auto px-4"
                                onClick={() => setIsAddingNew(false)}
                            >
                                Cancel
                            </Button>
                        </Card>
                    )}

                    {addresses.map((addr) => (
                        <Card key={addr.id} className="p-3 mb-3">
                            {editingAddress?.id === addr.id ? (<>
                                <AddressForm
                                    initialData={editingAddress}
                                    onSubmit={(updated) => saveEditedAddress(addr.id, updated)}
                                />
                                <Button
                                    variant="outline-danger"
                                    className="mt-2 w-auto d-block mx-auto px-4"
                                    onClick={() => setEditingAddress(null)}
                                >
                                    Cancel
                                </Button>
                            </>) : (<>
                                <p>
                                    <strong>{addr.name}</strong>
                                    <br />
                                    {addr.street}, {addr.city} - {addr.pincode}
                                    <br />
                                    Phone: {addr.phone}
                                </p>

                                <div className="d-flex gap-2">
                                    <Button size="sm" onClick={() => handleEdit(addr)}>
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => deleteAddress(addr.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </>
                            )}
                        </Card>
                    ))}

                    <Button variant="outline-danger" className="mt-4 w-100" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
        </div>
        <Footer />
        </>
    )
}

export default ProfilePage;