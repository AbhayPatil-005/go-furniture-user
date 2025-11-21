import { Container, Row, Col, Form, Button, Badge, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const cartCount = useSelector((state) => state.cart.items.length);
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        navigate(`/search?query=${query}`);
    };

  return (
    <header className="py-3 shadow-sm bg-white">
      <Container fluid className="px-4">
        <Row className="align-items-center g-3">
          
          <Col xs="12" md="3" className="text-center text-md-start">
            <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <span className="brand-logo">
                Go<span className="dot">-</span>Furniture
              </span>
            </Navbar.Brand>
          </Col>

          <Col xs="12" md="6">
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search for furniture, wardrobes, sofas..."
                className="me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="dark" type="submit">Search</Button>
            </Form>
          </Col>

          <Col
            xs="12"
            md="3"
            className="d-flex justify-content-center justify-content-md-end align-items-center gap-3"
          >
            {isLoggedIn ? (
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => navigate("/profile")}
              >
                My Account
              </Button>
            ) : (
              <Link to="/login" className="text-dark fw-semibold text-decoration-none">
                Login / Register
              </Link>
            )}

            <Button
                variant="outline-dark"
                className="position-relative"
                onClick={() => navigate("/cart")}
            >
                🛒
                {cartCount >= 0 && (
                    <Badge bg="danger" pill className=" position-absolute top-1 start-100 translate-middle">
                        {cartCount}
                    </Badge>
                )}
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;