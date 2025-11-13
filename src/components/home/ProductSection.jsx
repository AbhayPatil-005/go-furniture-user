import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const ProductSection = ({title, category, BASE_URL}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/products.json`);
                const data = await res.json();
                if (data) {
                    const list = Object.entries(data)
                        .map(([id, prod]) => ({ id, ...prod }))
                        .filter((p) => p.category === category);
                    setProducts(list.slice(0, 6));
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryProducts();
    }, [category, BASE_URL]);
    return (<>
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold">{title}</h3>
                <Button 
                    variant="link" 
                    onClick={() => navigate(`/category/${category.key}`)} 
                    className="text-decoration-none">
                    View All →
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-4">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {products.length > 0 ? (
                        products.map((prod) => (
                            <Col key={prod.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <ProductCard product={prod} />
                            </Col>
                        ))
                    ) : (
                        <p>No products found for {title}</p>
                    )}
                </Row>
            )}
        </Container>
    </>)
}

export default ProductSection;