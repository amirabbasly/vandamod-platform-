"use client";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import PinkButton from "@/components/atom/PinkButton";

const TNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div
        dir="rtl"
        className="w-full max-w-2xl bg-white text-black rounded-2xl shadow-xl p-6 md:p-10 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">محصول جدید</h2>

        {/* نوع محصول */}
        <div>
          <label className="block font-semibold mb-1">نوع محصول</label>
          <div className="bg-gray-100 text-gray-700 p-3 rounded">
            کالا برای فروش
          </div>
        </div>

        {/* نام محصول */}
        <div>
          <label className="block font-semibold mb-1">
            نام محصول <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-pink-400"
            placeholder="نام محصول را وارد کنید"
          />
        </div>

        {/* وضعیت محصول */}
        <div>
          <label className="block font-semibold mb-1">وضعیت محصول</label>
          <div className="bg-gray-100 text-gray-700 p-3 rounded">فوری</div>
        </div>

        {/* وضعیت */}
        <div>
          <label className="block font-semibold mb-1">وضعیت</label>
          <select className="w-full border p-2 rounded text-black">
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>
        </div>

        {/* دسته بندی */}
        <div>
          <label className="block font-semibold mb-1">
            دسته بندی محصول <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded text-black"
          >
            <option value="">انتخاب کنید</option>
            <option value="text">دسته: text</option>
          </select>
        </div>

        {/* تصویر نگاره */}
        <div>
          <label className="block font-semibold mb-1">
            تصویر نگاره <span className="text-red-500">*</span>
          </label>
          <div className="border p-4 rounded flex flex-col items-center text-center space-y-2">
            <FaCloudUploadAlt size={36} className="text-gray-500" />
            <input
              type="file"
              accept=".jpg"
              onChange={(e) =>
                setThumbnail(e.target.files ? e.target.files[0] : null)
              }
              className="text-sm text-gray-700"
            />
            <p className="text-sm text-gray-600 leading-6">
              حجم عکس‌ها باید حداکثر ۷۰ کیلوبایت باشد
              <br />
              سایز: ۷۰۰×۷۰۰ پیکسل
              <br />
              فرمت: <strong>jpg</strong>
            </p>
          </div>
        </div>

        {/* گالری محصول */}
        <div>
          <label className="block font-semibold mb-1">گالری محصول</label>
          <div className="border p-4 rounded text-center text-sm text-gray-600 cursor-pointer hover:bg-gray-50 transition">
            برای انتخاب عکس و فیلم کلیک کنید
          </div>
        </div>

        {/* هشدارها */}
        <ul className="text-red-600 text-sm list-disc pr-5 space-y-1">
          {!productName && <li>وارد کردن نام محصول الزامی است</li>}
          {!category && <li>انتخاب دسته‌بندی برای محصول الزامی است</li>}
          {!thumbnail && <li>انتخاب تصویر نگاره الزامی است</li>}
        </ul>

        {/* دکمه انتشار */}
        <div className="flex justify-center">
          <PinkButton
            text="انتشار"
            width="100%"
            action={() => alert("محصول در حال انتشار است")}
          />
        </div>
      </div>
    </div>
  );
};

export default TNewProduct;
