import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () =>{
    return(
        <>
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Navbar />
            <div className="mt-auto flex-grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
        </>
    )
}

export default MainLayout;