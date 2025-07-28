"use client";

import { useState, useRef, useEffect } from "react";
import { FaUser, FaBell, FaHeadset, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import useFullName from "@/hooks/useFullName";

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

  return (
    <div className="relative text-gray-600" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
      >
        <FaUser className="text-pink-500" />
        <span className="text-sm font-medium">{fullName || "کاربر"}</span>
        <FaChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="flex flex-col py-1">
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <FaUser className="text-gray-600" />
                <span>حساب کاربری</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <FaBell className="text-gray-600" />
                <span>نوتیفیکیشن‌ها</span>
              </Link>
            </li>
            <li>
              <Link
                href="/Dashboard"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
              >
                <FaHeadset className="text-gray-600" />
                <span>پشتیبانی</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
