'use client';
import { useState } from "react";
import { FaUsers, FaFilter, FaSearch } from "react-icons/fa";
import PinkButton from "@/components/atom/PinkButton"; 

const products = [
  {
    id: 1,
    image: "https://via.placeholder.com/40?text=p-img",
    name: "لباس یک",
    code: "Km۰۰۰۰۰۰۰۰۱",
    category: "جنتلمنانه",
    type: "متغیر",
    quantity: "✓",
    seller: "وندامد بتا",
    status: "فعال",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/40?text=p-img",
    name: "لباس 6",
    code: "Km۰۰۰۰۰۰۰۰۵",
    category: "جنتلمنانه",
    type: "ساده",
    quantity: "۱",
    seller: "وندامد بتا",
    status: "فعال",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/40?text=p-img",
    name: "لباس 4",
    code: "Km۰۰۰۰۰۰۰۰۴",
    category: "جنتلمنانه",
    type: "متغیر",
    quantity: "✓",
    seller: "وندامد بتا",
    status: "فعال",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/40?text=p-img",
    name: "لباس 3",
    code: "Km۰۰۰۰۰۰۰۰۳",
    category: "جنتلمنانه",
    type: "متغیر",
    quantity: "۰",
    seller: "وندامد بتا",
    status: "غیر فعال",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/40?text=p-img",
    name: "لباس 2",
    code: "Km۰۰۰۰۰۰۰۰۲",
    category: "جنتلمنانه",
    type: "متغیر",
    quantity: "۰",
    seller: "وندامد بتا",
    status: "فعال",
  },
];

const statusCounts = {
  all: 5,
  active: 4,
  inactive: 5,
  pending: 0,
  trash: 0,
};

const TAllProducts = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");

  // فیلتر محصولات بر اساس وضعیت و جستجو
  const filteredProducts = products.filter((p) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return p.status === "فعال";
    if (filterStatus === "inactive") return p.status === "غیر فعال";
    if (filterStatus === "pending") return false; // داده‌ای نداریم
    if (filterStatus === "trash") return false;   // داده‌ای نداریم
    return true;
  }).filter(p => p.name.includes(searchText));

  return (
    <div dir="rtl" className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6">همه محصولات</h1>

      {/* بخش بالایی - کارهای گروهی و فیلترها */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <PinkButton text="کارهای گروهی" action={() => alert("کارهای گروهی")} />
        <PinkButton text="اجرا" action={() => alert("اجرا")} bgcolor="#6B7280" />

        <div className="flex items-center space-x-2 ml-auto">
          <FaFilter className="text-gray-500" />
          <span className="text-gray-700 font-semibold">همه دسته بندی ها</span>
          <PinkButton text="صافی" action={() => alert("صافی دسته بندی")} bgcolor="#6B7280" />
        </div>

        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <span className="text-gray-700 font-semibold">فیلتر بر اساس موجودی</span>
          <PinkButton text="صافی" action={() => alert("صافی موجودی")} bgcolor="#6B7280" />
        </div>
      </div>

      {/* جستجو و وضعیت */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded px-3 py-1 flex-1 max-w-xs">
          <FaSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="جستجو"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="outline-none flex-grow text-black bg-white"
          />
        </div>

        <div className="flex gap-3">
          {[
            { label: "همه", value: "all" },
            { label: "فعال", value: "active" },
            { label: "غیرفعال", value: "inactive" },
            { label: "در انتظار", value: "pending" },
            { label: "زباله دان", value: "trash" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilterStatus(value)}
              className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${
                filterStatus === value ? "bg-[#E90089] text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {label} ({statusCounts[value] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* جدول */}
      <div className="overflow-x-auto rounded shadow border border-gray-300">
        <table className="w-full min-w-[700px] text-sm text-right">
          <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
            <tr>
              <th className="p-3">نام محصول</th>
              <th className="p-3">کد</th>
              <th className="p-3">دسته بندی</th>
              <th className="p-3">نوع</th>
              <th className="p-3">تعداد</th>
              <th className="p-3">فروشنده</th>
              <th className="p-3">وضعیت</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-6 text-gray-500">
                  محصولی یافت نشد
                </td>
              </tr>
            )}
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                  {p.name}
                </td>
                <td className="p-3">{p.code}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{p.type}</td>
                <td className="p-3">{p.quantity}</td>
                <td className="p-3">{p.seller}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3 text-center">
                  {/* اینجا میتونی دکمه های عملیات بذاری */}
                  <PinkButton text="ویرایش" action={() => alert(`ویرایش ${p.name}`)} width={70} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TAllProducts;
