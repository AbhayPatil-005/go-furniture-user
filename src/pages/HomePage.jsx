import HeroSlider from "../components/home/HeroSlider";
import ProductSection from "../components/home/ProductSection";

const HomePage = () => {
    const BASE_URL = import.meta.env.VITE_USER_FIREBASE_BASE_URL;
    return (<>
        <main>
            <HeroSlider />

            <ProductSection title="Chairs" category="chairs" BASE_URL={BASE_URL} />
            <ProductSection title="Sofas" category="sofas" BASE_URL={BASE_URL} />
            <ProductSection title="Beds" category="beds" BASE_URL={BASE_URL} />
            <ProductSection title="Wardrobes" category="wardrobes" BASE_URL={BASE_URL} />
            <ProductSection title="Benches/Tables" category="benches-tables" BASE_URL={BASE_URL} />
        </main>
    </>)
}

export default HomePage;