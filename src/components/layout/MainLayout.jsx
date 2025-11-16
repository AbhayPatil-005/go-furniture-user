import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () =>{
    return(
        <>
            <Header />
            <Navbar />
            <div className="mt-4">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default MainLayout;