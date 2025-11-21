import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Container, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../reduxStore/cartSlice";

const CategoryPage =()=>{
    const { categoryName } = useParams();
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toast, setToast] = useState({ show: false, message: "", variant: "", textColor: "" });
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
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryProducts();
    }, [categoryName]);

    if (loading)
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );

    return (<>
        <ToastContainer position="top-center" className="toast-float">
            <Toast
                bg={toast.variant}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                delay={3000}
                autohide
            >
                <Toast.Body className={toast.textColor}>{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
        <Container className="mt-4">
            <h3 className="mb-4 text-capitalize border-bottom pb-2">{categoryName.replace(/-/g, " ")}</h3>

            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={3} sm={6} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img
                                src={product.imageUrl}
                                style={{height:"100px",width:"100%", objectFit:"cover" }}
                            />

                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>₹{product.price}</Card.Text>

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
                                    onClick={() => dispatch(addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            imageUrl: product.imageUrl,
                                        },
                                        setToast({
                                            show:"true",
                                            message:`Added ${product.name} to cart`,
                                            variant:"success",
                                            textColor:"text-white text-center fw-bolder"
                                        })))
                                    }
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