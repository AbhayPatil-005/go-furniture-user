import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const cartCount = useSelector((state) => state.cart.items.length);


  return (
    <header className="py-3 shadow-sm bg-white">
      <Container fluid className="px-4">
        <Row className="align-items-center g-3">
          
          <Col xs="12" md="3" className="text-center text-md-start">
            <Link to="/" className="text-decoration-none text-dark fs-3 fw-bold">
              Go-Furniture
            </Link>
          </Col>

          <Col xs="12" md="6">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search for furniture, wardrobes, sofas..."
                className="me-2"
              />
              <Button variant="dark">Search</Button>
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