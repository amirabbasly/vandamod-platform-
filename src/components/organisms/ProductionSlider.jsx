'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FiArrowRight } from 'react-icons/fi'; // استفاده از آیکون
import axiosInstance from '@/utils/axiosInstance';

// ایجاد یک نمونه از axios با آدرس بیس API
const ProductionSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          sortBy: "LastUpdated",
          sort: "desc",
          inStock: 1,
          pageSize: 30,
          isActive: true,
          isClient: true,
        };

        const res = await axiosInstance.get("/api/product-list", { params });

        // بررسی وجود داده‌ها و دسترسی به آنها
        if (res && res.data && res.data.data && res.data.data.pagination && res.data.data.pagination.data) {
          setProducts(res.data.data.pagination.data);
          // چاپ تصویر محصول اول در کنسول
          console.log(res.data.data.pagination.data[0].mainImageSrc.imageUrl);
        } else {
          console.error("داده‌ای یافت نشد.");
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-5">
      <div className="flex flex-col md:w-1/3 md:mr-5">
        <img
          src=""
          alt=""
          className="mb-4" // فضای خالی بین تصویر و متن
        />
        <p className="text-lg font-semibold mb-2">به روز باش</p>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
        >
          نمایش همه <FiArrowRight className="ml-2" />
        </button>
      </div>
      <div className="flex-1">
        <Swiper spaceBetween={30} slidesPerView={3}>
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="p-4 border rounded-lg">
                <img
                  src={product.mainImageSrc.imageUrl}
                  alt={product.title}
                  className="mb-2 w-full h-auto"
                />
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-500">قیمت بعد از تخفیف: {product.price} تومان</p>
                <div className="text-green-600 font-semibold">%-10</div>
                <p className="text-gray-400">قیمت قبل از تخفیف: {product.mainMaxPrice} تومان</p>
                
                {/* نمایش اندازه‌ها */}
                <div className="mt-2">
                  <h3 className="text-sm font-semibold">اندازه‌ها:</h3>
                  <ul className="list-disc list-inside">
                    {product.productSizeInfo.rows.map((size) => (
                      <li key={size.id}>{size.productSizeValue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductionSlider;