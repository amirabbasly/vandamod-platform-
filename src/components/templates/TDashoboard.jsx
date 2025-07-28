"use client";
import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUndo,
  FaCommentDots,
  FaQuestionCircle,
  FaRegComments,
  FaCreditCard,
  FaCogs,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaThLarge,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
  FaCircle,
  FaBox,
  FaUsers,
  FaHeadset,
  FaFileAlt,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";

const stats = [
  {
    icon: <FaShoppingCart size={28} />,
    label: "سفارش جدید",
    value: 2,
    color: "bg-cyan-400",
  },
  {
    icon: <FaUndo size={28} />,
    label: "انصراف از خرید",
    value: 2,
    color: "bg-cyan-400",
  },
  {
    icon: <FaUndo size={28} />,
    label: "مرجوعی",
    value: 2,
    color: "bg-cyan-400",
  },
  {
    icon: <FaCommentDots size={28} />,
    label: "پیام از مشتری",
    value: 2,
    color: "bg-pink-400",
  },
  {
    icon: <FaCommentDots size={28} />,
    label: "پیام از وندامد",
    value: 2,
    color: "bg-pink-400",
  },
  {
    icon: <FaCommentDots size={28} />,
    label: "پیام از فروشنده",
    value: 2,
    color: "bg-pink-400",
  },
  {
    icon: <FaQuestionCircle size={28} />,
    label: "پرسش و پاسخ",
    value: 2,
    color: "bg-purple-400",
  },
  {
    icon: <FaRegComments size={28} />,
    label: "دیدگاه مقالات",
    value: 2,
    color: "bg-purple-400",
  },
  {
    icon: <FaRegComments size={28} />,
    label: "دیدگاه محصول",
    value: 2,
    color: "bg-purple-400",
  },
  {
    icon: <FaCreditCard size={28} />,
    label: "اعتبار پیامک",
    value: 2,
    color: "bg-green-300",
  },
  {
    icon: <FaCreditCard size={28} />,
    label: "اعتبار تامین",
    value: 2,
    color: "bg-green-300",
  },
];

const chartData = {
  labels: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
  datasets: [
    {
      label: "آمار بازدید",
      backgroundColor: "#06b6d4",
      data: [
        1000, 1500, 3000, 5000, 2000, 4000, 3500, 3000, 5000, 7000, 8000, 7500,
      ],
    },
    {
      label: "آمار فروش",
      backgroundColor: "#22c55e",
      data: [
        800, 1200, 2000, 3000, 1500, 2500, 2000, 1800, 3000, 4000, 4500, 5000,
      ],
    },
  ],
};

// Helper function to map permission names to icons
const getIconForPermission = (name) => {
  const iconMap = {
    "مدیریت محصولات": <FaBox size={20} />,
    "مدیریت کاربران": <FaUsers size={20} />,
    پشتیبانی: <FaHeadset size={20} />,
    مقالات: <FaFileAlt size={20} />,
    تنظیمات: <FaCogs size={20} />,
    سایر: <FaChartBar size={20} />,
    محصولات: <FaBox size={20} />,
    "محصول جدید": <FaBox size={20} />,
    "همه محصولات": <FaBox size={20} />,
    "همه محصول": <FaBox size={20} />,
    "دسته بندی محصولات": <FaBox size={20} />,
    "پیکربندی محصولات": <FaBox size={20} />,
    "ویژگی محصولات": <FaBox size={20} />,
    محصول: <FaBox size={20} />,
    برند: <FaBox size={20} />,
    برندها: <FaBox size={20} />,
    کاربران: <FaUsers size={20} />,
    "همه کاربران": <FaUsers size={20} />,
    "کاربر جدید": <FaUsers size={20} />,
    پرسنل: <FaUsers size={20} />,
    "سمت ها": <FaUsers size={20} />,
    مشتری: <FaUsers size={20} />,
    تیکت: <FaHeadset size={20} />,
    "دپارتمان تیکت": <FaHeadset size={20} />,
    "دپارتمان مرجوعی": <FaHeadset size={20} />,
    "دپارتمان لغوخرید": <FaHeadset size={20} />,
    "پیام ها": <FaHeadset size={20} />,
    دیدگاه: <FaHeadset size={20} />,
    اعلانات: <FaHeadset size={20} />,
    "مقاله جدید": <FaFileAlt size={20} />,
    "ایجاد مقاله": <FaFileAlt size={20} />,
    "همه مقالات": <FaFileAlt size={20} />,
    "تنظیمات عمومی": <FaCogs size={20} />,
    "رنگ آمیزی": <FaCogs size={20} />,
    "نمای سایت": <FaCogs size={20} />,
    "صفحه اصلی": <FaCogs size={20} />,
    فوتر: <FaCogs size={20} />,
    دپارتمان: <FaCogs size={20} />,
    پیامک: <FaCogs size={20} />,
  };
  return iconMap[name] || <FaCogs size={20} />;
};

// Helper function to generate slugs from permission names
const getSlugForPermission = (name) => {
  const slugMap = {
    "مدیریت محصولات": "products",
    "مدیریت کاربران": "users",
    پشتیبانی: "support",
    مقالات: "articles",
    تنظیمات: "settings",
    سایر: "others",
    محصولات: "products",
    "محصول جدید": "new-product",
    "همه محصولات": "all-products",
    "همه محصول": "all-products",
    "دسته بندی محصولات": "product-categories",
    "پیکربندی محصولات": "product-configurations",
    "ویژگی محصولات": "product-features",
    محصول: "product",
    برند: "brand",
    برندها: "brands",
    کاربران: "users",
    "همه کاربران": "all-users",
    "کاربر جدید": "new-user",
    پرسنل: "personnel",
    "سمت ها": "roles",
    مشتری: "customers",
    تیکت: "tickets",
    "دپارتمان تیکت": "ticket-department",
    "دپارتمان مرجوعی": "return-department",
    "دپارتمان لغوخرید": "cancel-department",
    "پیام ها": "messages",
    دیدگاه: "comments",
    اعلانات: "notifications",
    "مقاله جدید": "new-article",
    "ایجاد مقاله": "create-article",
    "همه مقالات": "all-articles",
    "تنظیمات عمومی": "general-settings",
    "رنگ آمیزی": "coloring",
    "نمای سایت": "site-view",
    "صفحه اصلی": "home-page",
    فوتر: "footer",
    دپارتمان: "departments",
    پیامک: "sms",
  };
  return slugMap[name] || name.toLowerCase().replace(/\s+/g, "-");
};

// Function to transform API permissions to menu structure
const transformPermissionsToMenu = (permissions) => {
  if (!Array.isArray(permissions)) {
    console.warn("Permissions is not an array:", permissions);
    return [];
  }

  // Define main menu categories
  const mainMenus = [
    {
      id: "products-main",
      label: "مدیریت محصولات",
      icon: <FaBox size={20} />,
      link: "/products",
      sub: [],
    },
    {
      id: "users-main",
      label: "مدیریت کاربران",
      icon: <FaUsers size={20} />,
      link: "/users",
      sub: [],
    },
    {
      id: "support-main",
      label: "پشتیبانی",
      icon: <FaHeadset size={20} />,
      link: "/support",
      sub: [],
    },
    {
      id: "articles-main",
      label: "مقالات",
      icon: <FaFileAlt size={20} />,
      link: "/articles",
      sub: [],
    },
    {
      id: "settings-main",
      label: "تنظیمات",
      icon: <FaCogs size={20} />,
      link: "/settings",
      sub: [],
    },
    {
      id: "others-main",
      label: "سایر",
      icon: <FaChartBar size={20} />,
      link: "/others",
      sub: [],
    },
  ];

  // Map permissions to main menu categories
  const categoryMap = {
    محصولات: "products-main",
    "محصول جدید": "products-main",
    "همه محصولات": "products-main",
    "همه محصول": "products-main",
    "دسته بندی محصولات": "products-main",
    "پیکربندی محصولات": "products-main",
    "ویژگی محصولات": "products-main",
    محصول: "products-main",
    برند: "products-main",
    برندها: "products-main",
    کاربران: "users-main",
    "همه کاربران": "users-main",
    "کاربر جدید": "users-main",
    پرسنل: "users-main",
    "سمت ها": "users-main",
    مشتری: "users-main",
    تیکت: "support-main",
    "دپارتمان تیکت": "support-main",
    "دپارتمان مرجوعی": "support-main",
    "دپارتمان لغوخرید": "support-main",
    "پیام ها": "support-main",
    دیدگاه: "support-main",
    اعلانات: "support-main",
    "مقاله جدید": "articles-main",
    "ایجاد مقاله": "articles-main",
    "همه مقالات": "articles-main",
    مقالات: "articles-main",
    تنظیمات: "settings-main",
    "تنظیمات عمومی": "settings-main",
    "رنگ آمیزی": "settings-main",
    "نمای سایت": "settings-main",
    "صفحه اصلی": "settings-main",
    فوتر: "settings-main",
    دپارتمان: "settings-main",
    پیامک: "settings-main",
  };

  // Process permissions
  permissions.forEach((perm, index) => {
    if (!perm.isActive || !perm.name || !perm.id) {
      console.warn("Skipping invalid permission:", perm);
      return;
    }

    const categoryId = categoryMap[perm.name] || "others-main";
    const mainMenu = mainMenus.find((menu) => menu.id === categoryId);

    if (mainMenu) {
      mainMenu.sub.push({
        label: perm.name,
        link: `/${getSlugForPermission(perm.name)}`,
        id: perm.id || `perm-${index}`,
      });
    } else {
      console.warn(`No category found for permission: ${perm.name}`);
    }
  });

  // Filter out main menus with no submenus and sort submenus
  const validMenuItems = mainMenus
    .filter((menu) => menu.sub.length > 0)
    .map((menu) => ({
      ...menu,
      sub: menu.sub.sort((a, b) => a.label.localeCompare(b.label)),
    }));

  return validMenuItems;
};

const TDashoboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSub, setOpenSub] = useState({});
  const [data, setData] = useState([]);

  const handleSubMenu = (id) => {
    setOpenSub((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavigateHome = () => {
    console.log("Logging out...");
    sessionStorage.removeItem("AuthToken");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const token = sessionStorage.getItem("AuthToken");
        if (!token) {
          console.warn("No token found in sessionStorage");
          setData([]);
          setOpenSub({});
          return;
        }
        const response = await axiosInstance.get("/api/user/info/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const permissions =
          response.data?.data?.userSpecification?.role?.permissions || [];
        if (!Array.isArray(permissions)) {
          console.error("Invalid permissions format:", permissions);
          setData([]);
          setOpenSub({});
          return;
        }
        const transformedMenu = transformPermissionsToMenu(permissions);
        setData(transformedMenu);
        setOpenSub({});
        console.log("Transformed Menu:", transformedMenu);
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        setData([]);
        setOpenSub({});
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#f3f7fa] flex-row-reverse">
      {/* Sidebar */}
      <aside
        className={`fixed  top-0 right-0 z-40 h-screen w-64 bg-[#23243a] text-white flex flex-col justify-between py-6 px-4 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:h-screen md:w-64 md:right-0 md:top-0 md:z-40 md:bg-[#23243a] md:flex md:flex-col md:justify-between md:py-6 md:px-4 md:shadow-none md:sticky md:min-h-screen md:max-h-screen md:overflow-hidden`}
      >
        <div className="overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-2 mb-8">
            <FaThLarge size={24} />
            <span className="font-bold text-lg">پیشخوان</span>
            <button
              className="md:hidden ml-auto"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id}>
                  <button
                    className="w-full flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#2d2e4a] transition focus:outline-none justify-between"
                    onClick={() =>
                      item.sub && item.sub.length > 0
                        ? handleSubMenu(item.id)
                        : null
                    }
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    {item.sub &&
                      item.sub.length > 0 &&
                      (openSub[item.id] ? (
                        <FaChevronUp size={16} />
                      ) : (
                        <FaChevronDown size={16} />
                      ))}
                  </button>
                  {item.sub && item.sub.length > 0 && openSub[item.id] && (
                    <div className="flex flex-col gap-1 pr-8 mt-1">
                      {item.sub.map((sub, subIdx) => (
                        <Link
                          key={`${item.id}-${subIdx}`}
                          href={sub.link}
                          className="py-1 px-2 rounded hover:bg-[#35365a] text-sm text-gray-200 transition flex items-center justify-end gap-2"
                        >
                          <span>{sub.label}</span>
                          <FaCircle size={8} color="#E90089" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">
                منویی برای نمایش وجود ندارد
              </div>
            )}
          </nav>
        </div>
        <button
          className="flex items-center gap-2 justify-center bg-[#23243a] border border-gray-700 rounded-lg py-2 mt-8 text-gray-300 hover:bg-[#2d2e4a] transition"
          onClick={handleNavigateHome}
        >
          <FaSignOutAlt /> خروج
        </button>
      </aside>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-4 md:px-8 py-4 border-b sticky top-0 z-20">
          <div className="text-sm text-gray-700">پنج شنبه ۲ مرداد ۱۴۰۴</div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-black">سعید محمدی</span>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <Link href="/">
              <button
                className="text-2xl font-bold text-pink-500 ml-2 relative cursor-pointer"
                style={{ fontFamily: "cursive" }}
              >
                <span
                  className="text-black font-bold"
                  style={{ fontFamily: "inherit" }}
                >
                  venda
                </span>
                <span className="absolute left-0 top-1/2 w-full h-1 border-b-4 border-pink-500 rotate-[-10deg] -translate-y-1/2"></span>
                Mode
              </button>
            </Link>
            <button
              className="md:hidden ml-2"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 flex flex-col md:flex-row gap-8 p-4 md:p-8">
          {/* Chart */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-2 text-black">
              آمار بازدید و فروش
            </h2>
            <div className="text-gray-700 text-sm mb-4">
              نمودار تعداد و فروش در سال
            </div>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                    labels: { font: { family: "inherit" } },
                  },
                },
              }}
              height={320}
            />
          </div>
          {/* Stats */}
          <div className="w-full md:w-96 flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              {stats.slice(0, 3).map((stat, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 flex flex-col items-center text-white ${stat.color} shadow-md`}
                >
                  {stat.icon}
                  <span className="text-2xl font-bold mt-2">{stat.value}</span>
                  <span className="text-sm mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {stats.slice(3, 6).map((stat, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 flex flex-col items-center text-white ${stat.color} shadow-md`}
                >
                  {stat.icon}
                  <span className="text-2xl font-bold mt-2">{stat.value}</span>
                  <span className="text-sm mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {stats.slice(6, 9).map((stat, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 flex flex-col items-center text-white ${stat.color} shadow-md`}
                >
                  {stat.icon}
                  <span className="text-2xl font-bold mt-2">{stat.value}</span>
                  <span className="text-sm mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(9, 11).map((stat, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 flex flex-col items-center text-white ${stat.color} shadow-md`}
                >
                  {stat.icon}
                  <span className="text-2xl font-bold mt-2">{stat.value}</span>
                  <span className="text-sm mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TDashoboard;
