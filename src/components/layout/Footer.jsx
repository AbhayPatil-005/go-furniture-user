import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer=()=>{
    return (
        <>
            <footer className="bg-dark text-light py-4">
                <Container>
                    <Row className="gy-3">

                        <Col md={4}>
                            <h5 className="fw-bold">Go-Furniture</h5>
                            <p className="text-secondary small">
                                Your trusted destination for stylish & affordable furniture.
                            </p>
                        </Col>

                        <Col md={4}>
                            <h6 className="fw-bold">Quick Links</h6>
                            <ul className="list-unstyled text-secondary small">
                                <li><NavLink to="/" className="text-secondary text-decoration-none">
                                    Home
                                </NavLink></li>
                                <li><NavLink to="/category/all" className="text-secondary text-decoration-none">
                                    Categories
                                </NavLink></li>
                                <li><NavLink to="/cart" className="text-secondary text-decoration-none">
                                    Cart
                                </NavLink></li>
                                <li><NavLink to="/orders" className="text-secondary text-decoration-none">
                                    My Orders
                                </NavLink></li>
                            </ul>
                        </Col>

                        <Col md={4}>
                            <h6 className="fw-bold">Contact Us</h6>
                            <p className="text-secondary small mb-1">+91 11111 11111 </p>
                            <p className="text-secondary small mb-1">support@gofurniture.com </p>
                            <p className="text-secondary small">Bengaluru, Karnataka </p>
                        </Col>

                    </Row>

                    <hr className="mt-3 mb-2 border-secondary" />

                    <p className="text-center small text-secondary mb-0">
                        © {new Date().getFullYear()} GoFurniture. All rights reserved.
                    </p>
                </Container>
            </footer>
        </>
    )
}

export default Footer;