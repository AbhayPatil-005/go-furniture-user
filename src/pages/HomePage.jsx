import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import ProductSection from "../components/home/ProductSection";
import Footer from "../components/layout/Footer";

const HomePage = () => {
    return (<>
        <Header />
        <Navbar />
        <main className="mt-2">
            <HeroSlider />

            <ProductSection title="Featured" category="featured" />
            <ProductSection title="Living Room" category="living-room" />
            <ProductSection title="Bedroom" category="bedroom" />
        </main>
        <Footer />
    </>)
}

export default HomePage;