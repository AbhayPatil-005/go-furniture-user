import { useState } from "react";
import { Form, Button, Container, Card, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../reduxStore/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "", textColor: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_USER_FIREBASE_AUTH_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error.message || "Login failed");

      dispatch(login({ token: data.idToken, email: data.email }));

      setToast({
        show: true,
        message: "Login successful ",
        variant: "success",
        textColor: "text-white",
      });

      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Login failed. Please try again.",
        variant: "danger",
        textColor: "text-white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" className="mt-3 text-center">
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

      <Container
        fluid
        className="d-flex flex-column justify-content-center align-items-center vh-100 w-100 m-0"
        style={{ backgroundColor: "#f9fbff" }}
      >
        <Card className="shadow-sm p-4 border-0" style={{ width: "360px" }}>
          <h4 className="text-center mb-4 fw-bold text-primary">Welcome Back</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 fw-semibold" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>

          <p className="mt-3 text-center mb-0">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-decoration-none fw-semibold text-primary">
              Sign Up
            </NavLink>
          </p>
        </Card>
      </Container>
    </>
  );
};

export default LoginPage;
