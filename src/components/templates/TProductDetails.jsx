'use client'
import React, { useState } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaComment, FaQuestionCircle, FaShareAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import toast, { Toaster } from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// کامپوننت Button سفارشی
const Button = ({ children, className, onClick }) => (
  <button
    className={`w-full lg:w-auto ${className}`}
    onClick={onClick}
    style={{ direction: 'rtl' }}
  >
    {children}
  </button>
);

const TProductDetails = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const product = {
    name: 'لباس یک',
    code: 'Km000000001',
    price: 1200000,
    originalPrice: 1500000,
    discount: '15%',
    description: 'لپ‌تاپی قدرتمند با پردازنده Intel Core i7، 16GB RAM و 512GB SSD مناسب برای گیمینگ و کارهای حرفه‌ای.',
    category: 'وندامد بتا > جنتلمنانه',
    sizes: ['س', 'تستس', 'MMMM'],
    colors: ['مشکی'],
    sleeves: ['سیربیسربیس', 'dxfbgfd', 'dsgfdsfdsf'],
    specs: {
      'وزن': '1.2 کیلوگرم',
      'جنس': 'پنبه',
      'مناسب برای': 'روزمره',
    },
    isInStock: false,
    images: ['https://dkstatics-public.digikala.com/digikala-products/69ccfa3aad0f37d5e7820f4e3764b0931c4ae238_1739822381.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80', 'https://dkstatics-public.digikala.com/digikala-products/69ccfa3aad0f37d5e7820f4e3764b0931c4ae238_1739822381.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80', 'https://dkstatics-public.digikala.com/digikala-products/69ccfa3aad0f37d5e7820f4e3764b0931c4ae238_1739822381.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80'],
  };

  const relatedProducts = [
    { name: 'لباس دو', image: 'https://dkstatics-public.digikala.com/digikala-products/ad4bbfc9c2a894e803fcf5df0ed4948bd1a366a2_1652730094.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80', price: 1100000 },
    { name: 'لباس سه', image: 'https://dkstatics-public.digikala.com/digikala-products/40026b18c2b053ac4a68c3288556dc899a77aecd_1727277566.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80', price: 1300000 },
  ];

  const handleSubmitComment = (e) => {
    e.preventDefault();
    toast.success(`نظر شما با امتیاز ${rating} ثبت شد: ${comment}`);
    setRating(0);
    setComment('');
  };

  const handleCopyLink = () => {
    const link = String(window.location.href || '');
    if (!link) {
      console.error('لینک معتبر نیست');
      toast.error('خطا در کپی لینک! لطفاً لینک را به صورت دستی کپی کنید.');
      return;
    }

    navigator.clipboard.writeText(link)
      .then(() => {
        setIsLinkCopied(true);
        toast.success('لینک با موفقیت کپی شد!');
        setTimeout(() => {
          setIsLinkCopied(false);
        }, 2000); // بازنشانی پس از 2 ثانیه
      })
      .catch((error) => {
        console.error('خطا در کپی کردن لینک:', error);
        // فال‌بک برای مرورگرهای قدیمی‌تر
        const textarea = document.createElement('textarea');
        textarea.value = link;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            setIsLinkCopied(true);
            toast.success('لینک با موفقیت کپی شد!');
            setTimeout(() => {
              setIsLinkCopied(false);
            }, 2000);
          } else {
            toast.error('خطا در کپی لینک! لطفاً لینک را به صورت دستی کپی کنید.');
          }
        } catch (err) {
          console.error('خطا در کپی با فال‌بک:', err);
          toast.error('خطا در کپی لینک! لطفاً لینک را به صورت دستی کپی کنید.');
        } finally {
          document.body.removeChild(textarea);
        }
      });
  };

  const handleShareClick = () => {
    setIsLinkCopied(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLinkCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-right" style={{ direction: 'rtl' }}>
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* گالری تصاویر */}
          <div className="relative">
            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
              <img
                src={product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-110' : ''}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              />
              <div className="absolute top-2 right-2 flex items-center gap-2">
                <div className="bg-[#E90089] text-[#FFFFFF] text-xs font-bold px-2 py-1 rounded">
                  {product.discount} تخفیف
                </div>
                <button
                  className="bg-[#FFFFFF] text-[#E90089] p-2 rounded-full shadow-md hover:bg-[#f0f0f0] transition"
                  onClick={() => toast.success('محصول به علاقه‌مندی‌ها اضافه شد!')}
                >
                  <FaHeart size={18} />
                </button>
                <button
                  className="bg-[#FFFFFF] text-[#E90089] p-2 rounded-full shadow-md hover:bg-[#f0f0f0] transition"
                  onClick={handleShareClick}
                >
                  <FaShareAlt size={18} />
                </button>
              </div>
            </div>
            <div className="flex space-x-2 mt-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer border-2 border-[#D1D5DB] hover:border-[#E90089]"
                />
              ))}
            </div>
          </div>

          {/* اطلاعات محصول */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3F3A42] mb-2">
                {product.name}
              </h1>
              <div className="flex items-center justify-end mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < 4 ? 'text-[#E90089]' : 'text-[#D1D5DB]'}
                  />
                ))}
                <span className="ml-2 text-sm text-[#D1D5DB]">0 نظر</span>
              </div>
              <div className="flex items-center justify-end mb-4">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#E90089] mr-2">
                  {new Intl.NumberFormat('fa-IR').format(product.price)} تومان
                </span>
                <span className="text-sm text-[#D1D5DB] line-through">
                  {new Intl.NumberFormat('fa-IR').format(product.originalPrice)} تومان
                </span>
              </div>

              {/* دسته‌بندی محصول */}
              <div className="mb-4">
                <span className="text-sm text-[#3F3A42] font-medium">دسته‌بندی محصول:</span>
                <span className="text-sm text-[#D1D5DB] ml-2">{product.category}</span>
              </div>

              {/* کد محصول */}
              <div className="mb-4">
                <span className="text-sm text-[#3F3A42] font-medium">کد محصول:</span>
                <span className="text-sm text-[#D1D5DB] ml-2">{product.code}</span>
              </div>

              {/* سایزبندی */}
              <div className="mb-4">
                <span className="text-sm text-[#3F3A42] font-medium">سایزبندی:</span>
                <span className="text-sm text-[#D1D5DB] ml-2">
                  {product.sizes.join('، ')}
                </span>
                <a href="#" className="text-sm text-[#E90089] ml-2 underline">
                  راهنمای سایز
                </a>
              </div>

              {/* رنگ */}
              <div className="mb-4">
                <span className="text-sm text-[#3F3A42] font-medium">رنگ:</span>
                <span className="text-sm text-[#D1D5DB] ml-2">{product.colors[0]}</span>
              </div>

              {/* آستین */}
              <div className="mb-4">
                <span className="text-sm text-[#3F3A42] font-medium">آستین:</span>
                <span className="text-sm text-[#D1D5DB] ml-2">
                  {product.sleeves.join('، ')}
                </span>
              </div>

              {/* وضعیت موجودی */}
              <div className="mb-4">
                <span className="text-sm text-[#3F3A42] font-medium">وضعیت:</span>
                <span className="text-sm text-red-600 ml-2">
                  {product.isInStock ? 'موجود در انبار' : 'اتمام موجودی'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="bg-[#E90089] text-[#FFFFFF] hover:bg-[#c70078] flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => toast.success('محصول به سبد خرید اضافه شد!')}
              >
                <FaShoppingCart className="mr-2" /> افزودن به سبد خرید
              </Button>
              <Button
                className="bg-[#D1D5DB] text-[#3F3A42] hover:bg-[#b0b5bc] flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => toast.success('محصول به علاقه‌مندی‌ها اضافه شد!')}
              >
                <FaHeart className="mr-2" /> افزودن به علاقه‌مندی‌ها
              </Button>
            </div>
          </div>
        </div>

        {/* مودال اشتراک‌گذاری */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-right relative" style={{ direction: 'rtl' }}>
              <button
                className="absolute top-2 left-2 text-[#3F3A42] hover:text-[#E90089]"
                onClick={handleCloseModal}
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-lg font-bold text-[#3F3A42] mb-4">اشتراک‌گذاری محصول</h3>
              <p className="text-sm text-[#D1D5DB] mb-4">لینک محصول را کپی کنید و با دیگران به اشتراک بگذارید:</p>
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={window.location.href || 'لینک نامعتبر'}
                  readOnly
                  className="flex-1 p-2 border border-[#D1D5DB] rounded-md text-[#3F3A42] text-sm"
                />
              </div>
              <Button
                className={`flex items-center justify-center py-2 px-4 rounded-md transition-colors duration-200 ${
                  isLinkCopied ? 'bg-green-500 text-[#FFFFFF]' : 'bg-[#E90089] text-[#FFFFFF] hover:bg-[#c70078]'
                }`}
                onClick={handleCopyLink}
              >
                {isLinkCopied && <FaCheck className="mr-2 text-green-200" />}
                {isLinkCopied ? 'لینک کپی شد' : 'کپی لینک'}
              </Button>
            </div>
          </div>
        )}

        {/* تب‌ها */}
        <div className="mt-10">
          <div className="flex border-b border-[#D1D5DB]">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-[#E90089] text-[#3F3A42]' : 'text-[#D1D5DB]'}`}
              onClick={() => setActiveTab('description')}
            >
              توضیحات
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'specs' ? 'border-b-2 border-[#E90089] text-[#3F3A42]' : 'text-[#D1D5DB]'}`}
              onClick={() => setActiveTab('specs')}
            >
              مشخصات فنی
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-[#E90089] text-[#3F3A42]' : 'text-[#D1D5DB]'}`}
              onClick={() => setActiveTab('reviews')}
            >
              <FaComment className="inline mr-1" /> نظرات کاربران
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'qa' ? 'border-b-2 border-[#E90089] text-[#3F3A42]' : 'text-[#D1D5DB]'}`}
              onClick={() => setActiveTab('qa')}
            >
              <FaQuestionCircle className="inline mr-1" /> پرسش و پاسخ
            </button>
          </div>

          {/* محتوای تب‌ها */}
          {activeTab === 'description' && (
            <div className="p-4 text-[#3F3A42] text-sm">
              {product.description}
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="p-4">
              <table className="w-full text-sm text-[#3F3A42]">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-[#D1D5DB]">
                      <td className="py-2">{key}</td>
                      <td className="py-2 text-[#D1D5DB]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#3F3A42] mb-4">نظرات کاربران</h3>
              <p className="text-sm text-[#D1D5DB]">هنوز نظری ثبت نشده است.</p>
              <form onSubmit={handleSubmitComment} className="mt-4">
                <div className="flex space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < rating ? 'text-[#E90089] cursor-pointer' : 'text-[#D1D5DB] cursor-pointer'}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full p-2 border border-[#D1D5DB] rounded-md text-[#3F3A42] mb-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="نظر خود را بنویسید..."
                />
                <Button
                  className="bg-[#E90089] text-[#FFFFFF] hover:bg-[#c70078] py-2 px-4 rounded-md"
                  type="submit"
                >
                  ثبت نظر
                </Button>
              </form>
            </div>
          )}
          {activeTab === 'qa' && (
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#3F3A42] mb-4">پرسش و پاسخ</h3>
              <p className="text-sm text-[#D1D5DB]">هنوز پرسشی ثبت نشده است.</p>
            </div>
          )}
        </div>

        {/* پیشنهادات مرتبط (اسلایدر) */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-[#3F3A42] mb-4">محصولات مرتبط</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {relatedProducts.map((prod, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <img src={prod.image} alt={prod.name} className="w-full h-32 object-cover rounded-md mb-2" />
                  <h4 className="text-sm text-[#3F3A42]">{prod.name}</h4>
                  <p className="text-sm text-[#E90089]">
                    {new Intl.NumberFormat('fa-IR').format(prod.price)} تومان
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TProductDetails;