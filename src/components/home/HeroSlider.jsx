import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";

const HeroSlider=()=>{
    const slides = [
        {
            id: 1,
            image:
                "https://www.nilkamalfurniture.com/cdn/shop/files/Furniture_Festival_Main_Banner_Desktop.webp?v=1728299914",
            caption: "Transform Your Home with Modern Furniture",
        },
        {
            id: 2,
            image:
                "https://www.nilkamalfurniture.com/cdn/shop/files/Mattress_Banner_Desktop.webp?v=1728299921",
            caption: "Sleep Like Royalty — Explore Premium Mattresses",
        },
        {
            id: 3,
            image:
                "https://www.nilkamalfurniture.com/cdn/shop/files/Workstation_Banner_Desktop.webp?v=1728299927",
            caption: "Work Smart, Sit Comfortably — Explore Office Chairs",
        },
    ];
    return (
        <div className="hero-slider">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="slide-container">
                            <img
                                src={slide.image}
                                alt={slide.caption}
                                className="hero-img"
                                loading="lazy"
                            />
                            <div className="caption">
                                <h2>{slide.caption}</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>)
}

export default HeroSlider;