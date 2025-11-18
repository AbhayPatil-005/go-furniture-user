import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reduxStore/cartSlice";
import { Toast, ToastContainer } from "react-bootstrap";

const ProductDetailsPage=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const cartItems = useSelector((state)=>state.cart.items)
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({show:false, message:"", variant:"",textColor:""});

    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products/${id}.json`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.log("Failed to load product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAdd = () => {
        const existing = cartItems.find((i) => i.id === id);
        if (existing && existing.cartQuantity >= product.quantity) {
            setToast({
                show: true,
                message: `Only ${product.quantity} available in stock`,
                variant: "warning",
                textColor: "text-dark",
            });
            return;
        }
        dispatch(addToCart({
            id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            stock: product.quantity
        }));
        setToast({
            show: true,
            message: `${product.name} added to cart`,
            variant: "success",
            textColor: "text-white",
        });
    };

    if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

    if (!product) return <p className="text-danger mt-4">Product not found</p>;

    const isOutOfStock = product.quantity <= 0;

    return (<>
        <ToastContainer position="top-center" className="mt-3">
            <Toast
                bg={toast.variant}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                autohide
                delay={2000}
            >
                <Toast.Body className={toast.textColor}>{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
        <Container fluid className="py-4 bg-light mt-0">
            <Button variant="outline-secondary" className="mb-3" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <Card className="
                p-4 w-75 mx-auto h-auto
                shadow-sm 
                border-0 
                d-flex 
                flex-row 
                justify-content-evenly
                ">
                
                <div className="text-center ">
                    <img
                        className="img-fluid "
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "460px", borderRadius: "8px" }}
                    />
                </div>
                <div className="border rounded p-3 d-flex flex-column justify-content-between">
                    <div >
                        <h3 className="fw-bold">{product.name}</h3>
                        {isOutOfStock ?
                            (<p className="text-danger fw-semibold"> ! Out of Stock</p>
                            ) : (
                                <p className="text-primary fw-semibold">
                                    Available: {product.quantity}
                                </p>)
                        }
                        <p className="mt-3 overflow-x-auto" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {product.description}
                        </p>
                    </div>
                    <div className="d-flex">
                        <h4 className="text-success">₹{product.price}</h4>
                        <Button
                            className="ms-auto mt-auto"
                            variant={isOutOfStock ? "secondary" : "primary"}
                            disabled={isOutOfStock}
                            onClick={handleAdd}
                        >{isOutOfStock ? "Out of Stock" : "Add to Cart"}
                        </Button>
                    </div>
                </div>
            </Card>
        </Container>
    </>)
} 

export default ProductDetailsPage;