import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard=({product})=>{
    const navigate = useNavigate();

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

            <Card.Body>
                <Card.Title className="fs-6">{product.name}</Card.Title>

                <p className="fw-bold text-success mb-2">₹ {product.price}</p>

                <Button
                    variant="dark"
                    className="w-100"
                    onClick={(e) => {
                        e.stopPropagation(); // prevent card click
                        console.log("Add to cart:", product.id);
                    }}
                >
                    Add to Cart
                </Button>
            </Card.Body>
        </Card>
    </>)
}
export default ProductCard;