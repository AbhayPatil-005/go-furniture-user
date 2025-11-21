import { Card, Button, Toast, ToastContainer, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../reduxStore/cartSlice";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";

const ProductCard=({product})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.items);
    const isOutOfStock = product.quantity <= 0; 
    const [toast, setToast] = useState({
        show:false, message:"", variant:"", textColor:""
    });

    const handleAdd=()=>{
        const existing = cartItems.find(item=>item.id === product.id)
        if (existing && existing.cartQuantity >= product.quantity) {
            setToast({
                show:true, 
                message:`Only ${product.quantity} available in stock`,
                variant:'warning',
                textColor:'text-dark text-center',
            })
            return;
        };
            dispatch(
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    stock: product.quantity,
                })
            );

            setToast({
                show:true, 
                message:`Added ${product.name} to cart`,
                variant:'success',
                textColor:'text-white text-center ',
            })
        
    }

    return (<>
        <ToastContainer position="top-center" className="toast-float">
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
        <Card
            className="shadow-sm h-100 product-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/${product.id}`)}
            >
            <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ height: "220px", objectFit: "cover" }}
            />
            {isOutOfStock && (
                <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                    Out of Stock
                </Badge>
            )}

            <Card.Body>
                <Card.Title className="fs-6">{product.name}</Card.Title>

                <p className="fw-bold text-success mb-2">₹ {product.price}</p>

                <Button
                    variant={isOutOfStock?"secondary":"dark"}
                    className="w-100"
                    disabled={isOutOfStock}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAdd();
                    }}
                >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
            </Card.Body>
        </Card>
    </>)
}
export default ProductCard;