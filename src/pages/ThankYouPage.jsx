import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const ThankYouPage = () => {
  return (<>
    <Header />
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 text-center shadow-sm" style={{ maxWidth: "420px"}}>
        <h2 className="fw-bold text-success"> Order Placed!</h2>
        <p className="text-muted mt-2">
          Thank you for shopping with <strong>Go-Furniture</strong>.<br />
          Your order has been received and will be processed shortly.
        </p>

        <Button
          as={Link}
          to="/"
          variant="primary"
          className="mt-3 w-100 fw-semibold"
        >
          Continue Shopping
        </Button>

        <Button
          as={Link}
          to="/orders"
          variant="outline-secondary"
          className="mt-2 w-100 fw-semibold"
        >
          View My Orders
        </Button>
      </Card>
    </div>
    <Footer />
  </>);
};

export default ThankYouPage;