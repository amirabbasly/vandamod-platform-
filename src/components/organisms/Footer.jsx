// components/Footer.js
import {
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 rtl text-right mt-24 border-t pt-6 min-w-full rounded-3xl pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* درباره ما */}
        <div>
          <h3 className="text-lg font-bold mb-3">وندا مد</h3>
          <p className="text-sm leading-6">
            وندا مد، پلتفرم نوآورانه‌ای برای خرید و فروش محصولات مد و پوشاک.
            گروه توسعه هوشمند مجلل با هدف تجربه‌ای متفاوت از خرید آنلاین، وندا مد را خلق کرده است.
          </p>
        </div>

        {/* راه‌های ارتباطی */}
        <div>
          <h3 className="text-lg font-bold mb-3">راه‌های ارتباطی</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              تهران، خیابان انقلاب، ساختمان وندا، طبقه ۵
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-green-500" />
              ۰۹۱۲۶۰۰۹۳۲۰
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              info@vandamod.com
            </li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h3 className="text-lg font-bold mb-3">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
          <div className="flex gap-4 mt-2 justify-start">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition">
              <FaTelegram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500 transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="mt-6 border-t pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} کلیه حقوق این وب‌سایت متعلق به گروه توسعه هوشمند مجلل می‌باشد.
      </div>
    </footer>
  );
}
