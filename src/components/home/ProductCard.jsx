import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../reduxStore/cartSlice";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductCard=({product})=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.items);
    const isOutOfStock = product.quantity <= 0; 

    const handleAdd=()=>{
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