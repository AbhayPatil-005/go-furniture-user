import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Button, Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../reduxStore/cartSlice";

const ProductDetailsPage=()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

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
        dispatch(addToCart({
            id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
        }));
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
        <Container className="py-4">
            <Button variant="light" className="mb-3" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <Card className="p-4 shadow-sm border-0">
                
                <div className="text-center mb-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "260px", borderRadius: "8px" }}
                    />
                </div>

                <h3 className="fw-bold">{product.name}</h3>
                <p className="text-muted">Category: {product.category}</p>
                <h4 className="text-success">₹{product.price}</h4>

                <p className="mt-3">{product.description}</p>

                {isOutOfStock ? (
                    <p className="text-danger fw-semibold"> ! Out of Stock</p>
                ) : (
                    <p className="text-primary fw-semibold">
                        Available: {product.quantity}
                    </p>
                )}

                <Button
                    className="mt-3"
                    variant={isOutOfStock ? "secondary" : "primary"}
                    disabled={isOutOfStock}
                    onClick={handleAdd}
                >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
            </Card>
        </Container>
    </>)
} 

export default ProductDetailsPage;