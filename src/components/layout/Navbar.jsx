import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar=()=>{

    const categories = [
    { label: "Chairs", path: "/category/chairs" },
    { label: "Sofas", path: "/category/sofas" },
    { label: "Beds", path: "/category/beds" },
    { label: "Wardrobes", path: "/category/wardrobes" },
    { label: "Benches/Tables", path: "/category/benches-tables" },
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
            </Container>
        </nav>
    </>)
}

export default Navbar;