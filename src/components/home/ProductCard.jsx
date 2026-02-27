import { Card, Button, Badge } from "react-bootstrap";
import { addToCart } from "../../reduxStore/cartSlice";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductDetailModal from "./ProductDetailModal";

const ProductCard=({product})=>{
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.items);
    const isOutOfStock = product.quantity <= 0; 
    const [showModal, setShowModal] = useState(false);

    const handleAdd=(e)=>{
        e.stopPropagation();
        const existing = cartItems.find(item=>item.id === product.id)
        if (existing && existing.cartQuantity >= product.quantity) {
            toast.warning(`Only ${product.quantity} available in stock`);
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
        toast.success(`${product.name} added to cart 🛒`);
    }

    return (<>
        <ProductDetailModal
        productId={product.id}
        show={showModal}
        onHide={() => setShowModal(false)}
        />
        <Card
            className="shadow-sm h-100 product-card"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(true)}
            >
            <div style={{ position: "relative", overflow: "hidden" }}>
            <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ height: "220px", objectFit: "cover", transition: "transform 0.3s ease" }}
                className="product-card-img"
                onError={(e) => { e.target.src = "https://placehold.co/400x220?text=No+Image"; }}
            />
            {isOutOfStock && (
                <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                    Out of Stock
                </Badge>
            )}
            </div>

            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 mb-1">{product.name}</Card.Title>

                <p className="fw-bold text-success mb-3">₹ {Number(product.price).toLocaleString()}</p>

                <Button
                    variant={isOutOfStock?"secondary":"dark"}
                    className="w-100"
                    disabled={isOutOfStock}
                    onClick={handleAdd}
                >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
            </Card.Body>
        </Card>
    </>)
}
export default ProductCard;