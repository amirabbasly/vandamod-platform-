"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaHeart,
  FaBell,
  FaBox,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaCommentDots,
  FaEye,
} from "react-icons/fa";
import Header from "../organisms/Header";

const sections = [
  { key: "profile", label: "حساب کاربری", icon: FaUser },
  { key: "orders", label: "سفارش‌ها", icon: FaBox },
  { key: "addresses", label: "آدرس‌ها", icon: FaMapMarkerAlt },
  { key: "notifications", label: "اعلانات", icon: FaBell },
  { key: "favorites", label: "علاقه‌مندی‌ها", icon: FaHeart },
  { key: "supportTickets", label: "تیکت‌های پشتیبانی", icon: FaTicketAlt },
  { key: "comments", label: "دیدگاه‌ها", icon: FaCommentDots },
  { key: "recentViews", label: "بازدیدهای اخیر", icon: FaEye },
];

const ProfileForm = () => (
  <>
    <h2 className="text-lg font-semibold mb-4">حساب کاربری</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          شماره کاربری / موبایل
        </label>
        <input
          type="text"
          value="09395954529"
          disabled
          className="w-full border px-3 py-2 rounded-lg text-sm bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">جنسیت</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="female" defaultChecked />
            <span>بانو</span>
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="male" />
            <span>آقا</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">نام</label>
        <input
          type="text"
          defaultValue="مرصاد"
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">نام خانوادگی</label>
        <input
          type="text"
          defaultValue="کرمی"
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">کد ملی (اختیاری)</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">تاریخ تولد</label>
        <input
          type="date"
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">شماره کارت بانکی</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">شماره شبا</label>
        <div className="flex items-center gap-2">
          <span className="text-sm">IR</span>
          <input
            type="text"
            className="flex-1 border px-3 py-2 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm text-gray-600 mb-1">پست الکترونیک</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>
    </div>

    <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm">
      ذخیره
    </button>
  </>
);

const TProfile = () => {
  const [activeSection, setActiveSection] = React.useState("profile");

  return (
    <>
      <Header />
      <div className="max-w-7xl text-black mx-auto mt-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 rtl text-right min-h-[80vh]">
        {/* Form Section */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow p-6 space-y-4">
          {activeSection === "profile" && <ProfileForm />}
          {activeSection !== "profile" && activeSection && (
            <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-[200px]">
              <h3 className="text-lg font-semibold mb-4">
                {sections.find((s) => s.key === activeSection)?.label}
              </h3>
              {/* فرم مربوط به بخش انتخاب شده فعلا خالی */}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-xl shadow p-4">
          {/* User Info */}
          <div className="text-center mb-6">
            <FaUser size={40} className="mx-auto text-pink-500 mb-2" />
            <p className="text-lg font-semibold">مرصاد کرمی</p>
            <p className="text-sm text-gray-500">09395954529</p>
            <button className="mt-4 text-red-500 flex items-center gap-2 mx-auto hover:text-red-700 transition text-sm">
              <FaSignOutAlt />
              خروج
            </button>
          </div>

          {/* Navigation */}
          <ul className="space-y-4 text-xl">
            {sections.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex items-center justify-end gap-2 cursor-pointer transition ${
                  activeSection === key
                    ? "text-pink-600 font-semibold"
                    : "hover:text-pink-600"
                }`}
              >
                <span>{label}</span>
                <Icon />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TProfile;
