"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";

// وارد کردن استایل‌های Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/blur.css";

const MainSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await axiosInstance.get("/api/sliders");
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("خطا در دریافت اسلایدرها:", error);
        setError("بارگذاری اسلایدرها با خطا مواجه شد");
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <LazyLoadImage
          src="/images/loading-placeholder.jpg" // مسیر تصویر placeholder لودینگ
          alt="در حال بارگذاری"
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
          effect="blur"
          className="rounded-lg"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-w-full px-0">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="mySwiper"
      >
        {data.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link
              href={slide.link || "#"}
              className="block w-full relative"
            >
              <LazyLoadImage
                src={slide.image.imageUrl}
                alt={`اسلاید ${slide.id}`}
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
                effect={slide.image.placeholder ? "blur" : undefined}
                placeholderSrc={slide.image.placeholder}
                className="rounded-md"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .mySwiper {
          --swiper-navigation-color: #ffffff;
          --swiper-pagination-color: #ffffff;
          --swiper-pagination-bullet-inactive-color: #999999;
          --swiper-pagination-bullet-inactive-opacity: 0.4;
          --swiper-pagination-bullet-size: 12px;
          --swiper-navigation-size: 44px;
          width: 100vw;
        }

        .swiper-button-prev,
        .swiper-button-next {
          background-color: rgba(0, 0, 0, 0.5);
          padding: 20px;
          border-radius: 50%;
          transition: background-color 0.3s;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .swiper-pagination {
          padding-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default MainSlider;
