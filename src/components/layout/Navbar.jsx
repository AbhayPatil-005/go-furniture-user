import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar=()=>{
    const { isLoggedIn } = useSelector((state) => state.auth);

    const categories = [
    { label: "Living Room", path: "/category/living-room" },
    { label: "Bedroom", path: "/category/bedroom" },
    { label: "Dining", path: "/category/dining" },
    { label: "Kids Furniture", path: "/category/kids" },
    { label: "Plastic Chairs", path: "/category/chairs" },
    { label: "Premium Furniture", path: "/category/premium" },
    ];

    return (<>
        <nav className="bg-light border-bottom py-2">
            <Container className="d-flex gap-4">
                {categories.map((c) => (
                    <NavLink
                        key={c.path}
                        to={c.path}
                        className={({ isActive }) =>
                            isActive? "fw-bold text-dark text-decoration-none"
                                    : "text-secondary text-decoration-none"
                        }
                    >
                        {c.label}
                    </NavLink>
                ))}

                {isLoggedIn && (
                    <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                            isActive
                                ? "fw-bold text-dark text-decoration-none ms-auto"
                                : "text-secondary text-decoration-none ms-auto"
                        }
                    >
                        My Orders
                    </NavLink>
                )}
            </Container>
        </nav>
    </>)
}

export default Navbar;