import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../reduxStore/cartSlice";

const CategoryPage =()=>{
    const { categoryName } = useParams();
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false); 
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/products.json`);
                const data = await res.json();
                if (!data) {
                    setProducts([]);
                    return;
                }

                const filtered = Object.keys(data)
                    .map((key) => ({ id: key, ...data[key] }))
                    .filter((prod) => prod.category === categoryName);

                setProducts(filtered);
            } catch (err) {
                console.error("Error:", err);
                toast.error("Failed to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryProducts();
    }, [categoryName]);

    const handleAddToCart = (product) =>{
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

    if (loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );

    return (<>
        <Container className="mt-4">
            <h3 className="mb-4 text-capitalize border-bottom pb-2">{categoryName.replace(/-/g, " ")}</h3>

            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={3} sm={6} className="mb-4">
                        <Card className="shadow-sm">
                            <div style={{
                                width: "100%",
                                aspectRatio: "4 / 3",
                                overflow: "hidden",
                            }}>
                                <Card.Img
                                    src={product.imageUrl}
                                    style={{ height: "100%", width: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <Card.Body>
                                <div style={{ minHeight: "70px" }}>
                                <Card.Title>{product.name}</Card.Title>
                                </div>
                                <Card.Text>₹ {product.price}/-</Card.Text>

                                <Button
                                    variant="outline-primary"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="w-100 mb-2"
                                >
                                    View Details
                                </Button>

                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {products.length === 0 && (
                <p className="text-center text-muted">No products in this category.</p>
            )}
        </Container>
    </>)
}

export default CategoryPage;