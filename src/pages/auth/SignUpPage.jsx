import { useState } from "react";
import { Form, Button, Container, Card, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../reduxStore/authSlice";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const SignUpPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", variant: "", textColor: "" });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const API_KEY = import.meta.env.VITE_USER_FIREBASE_AUTH_API_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Email and password validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setToast({
                show: true,
                message: "Please enter a valid email address ",
                variant: "danger",
                textColor: "text-white",
            });
            return;
        }
        if (formData.password.length < 6) {
            setToast({
                show: true,
                message: "Password must be at least 6 characters long ",
                variant: "warning",
                textColor: "text-dark",
            });
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setToast({
                show: true,
                message: "Passwords do not match",
                variant: "danger",
                textColor: "text-white",
            });
            return;
        }

        setLoading(true);
        //Network call - Authentication
        try {
            const res = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
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
            if (!res.ok) throw new Error(data.error.message || "Signup failed");

            // Store token and email via Redux
            dispatch(login({ token: data.idToken, email: data.email }));

            setToast({
                show: true,
                message: "Account created successfully!",
                variant: "success",
                textColor: "text-white",
            });

            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setToast({
                show: true,
                message: error.message || "Signup failed. Try again.",
                variant: "danger",
                textColor: "text-white ",
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
            <Header />
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center vh-auto py-5 w-100 m-0"
                style={{ backgroundColor: "#f6fcffff" }}
            >
                <Card className="shadow-sm p-4 border-0" style={{ width: "360px" }}>
                    <h4 className="text-center mb-4 fw-bold text-primary">Create Account</h4>

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

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                                disabled={loading}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 fw-semibold" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                        </Button>
                    </Form>

                    <p className="mt-3 text-center mb-0">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-decoration-none fw-semibold text-primary">
                            Login
                        </NavLink>
                    </p>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default SignUpPage;

