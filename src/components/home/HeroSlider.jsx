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
                "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg",
            caption: "Transform Your Home with Modern Furniture",
        },
        {
            id: 2,
            image:
                "https://cdn.pixabay.com/photo/2015/03/12/14/23/bedroom-670249_1280.jpg",
            caption: "Sleep Like Royalty — Explore Premium Mattresses",
        },
        {
            id: 3,
            image:
                "https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg",
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
                                style={{height:"450px", width:"100%", objectFit: "cover" }}
                                src={slide.image}
                                alt={slide.caption}
                                className="hero-img"
                                loading="lazy"
                            />
                            <div className="caption p-3">
                                <h2>{slide.caption}</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>)
}

export default HeroSlider;