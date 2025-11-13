import HeroSlider from "../components/home/HeroSlider";
import ProductSection from "../components/home/ProductSection";

const HomePage = () => {
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    return (<>
        <main className="mt-2">
            <HeroSlider />

            <ProductSection title="1 Door Wardrobes" category="1-door-wardrobe" BASE_URL={BASE_URL} />
            <ProductSection title="2 Door Wardrobes" category="2-door-wardrobe" BASE_URL={BASE_URL} />
            <ProductSection title="Sliding Wardrobes" category="sliding-wardrobe" BASE_URL={BASE_URL} />
        </main>
    </>)
}

export default HomePage;