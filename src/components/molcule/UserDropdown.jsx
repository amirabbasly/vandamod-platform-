"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaBell,
  FaHeadset,
  FaChevronDown,
  FaHeart,
} from "react-icons/fa";
import Link from "next/link";
import useFullName from "@/hooks/useFullName";
import { FaBasketShopping } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fullName = useFullName();

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);
  const handleNavigateHome = () => {
    console.log("Logging out...");
    sessionStorage.removeItem("AuthToken");
    window.location.href = "/";
  };
  return (
    <div className="relative text-gray-600" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
      >
        <FaUser className="text-pink-500" />
        <span className="text-sm font-medium">{fullName || "کاربر"}</span>
        <FaChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col py-1">
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center justify-end gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <span>پیشخوان</span>
                <FaUser className="text-gray-600" />
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center justify-end gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <span>حساب کاربری</span>
                <FaUser className="text-gray-600" />
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center justify-end gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <span>سفارش های من</span>
                <FaBasketShopping className="text-gray-600" />
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center justify-end gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <span>علاقه مندی ها</span>
                <FaHeart className="text-gray-600" />
              </Link>
            </li>
            <li
              onClick={handleNavigateHome}
              className="flex items-center cursor-pointer text-red-600 justify-end gap-2 px-4 py-2 hover:bg-gray-100 transition"
            >
              <span className="border-b border-red-600">خروج از حساب</span>
              <FiLogOut className="text-red-600" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
