import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";


const CategoryPage =()=>{
    const { categoryName } = useParams();
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;

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

    return(<>
        <Container className="mt-4">
            <h3 className="mb-4 text-capitalize">{categoryName.replace(/-/g, " ")}</h3>

            <Row>
                {products.map((product) => (
                    <Col key={product.id} md={3} sm={6} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img
                                src={product.imageUrl}
                                style={{ height: "200px", objectFit: "cover" }}
                            />

                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>₹{product.price}</Card.Text>

                                <Button
                                    variant="primary"
                                    onClick={() => console.log("Go to details")}
                                    className="w-100 mb-2"
                                >
                                    View Details
                                </Button>

                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={() => navigate(`/product/${product.id}`)}
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