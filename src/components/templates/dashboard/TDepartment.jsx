'use client';
import PinkButton from "@/components/atom/PinkButton"; 
import { FaUsers, FaSyncAlt, FaBan } from "react-icons/fa";

const departments = [
  { id: 1, name: "دپارتمان تیکت", icon: <FaUsers className="text-[#E90089]" />, related: "پرسنل", value: 1 },
  { id: 2, name: "دپارتمان مرجوعی", icon: <FaSyncAlt className="text-[#E90089]" />, related: "مشتری", value: 0 },
  { id: 3, name: "دپارتمان لغوخرید", icon: <FaBan className="text-[#E90089]" />, related: "فروشنده", value: 0 },
  { id: 4, name: "دپارتمان تیکت", icon: <FaUsers className="text-[#E90089]" />, related: "پرسنل", value: 1 },
];

const TDepartment = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-3xl font-bold mb-8">دپارتمان‌ها</h1>

      <div className="space-y-6 max-w-3xl mx-auto">

        {/* لیست دپارتمان‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {departments.map(({ id, name, icon }) => (
            <div
              key={id}
              className="flex items-center gap-3 p-4 border rounded shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="text-3xl">{icon}</div>
              <div className="text-lg font-semibold">{name}</div>
            </div>
          ))}
        </div>

        {/* جدول مرتبط به مقدار عملیات */}
        <div className="mt-10 border border-gray-300 rounded shadow overflow-x-auto">
          <table className="w-full text-right text-black min-w-[320px]">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300">مرتبط به</th>
                <th className="py-3 px-4 border-b border-gray-300">مقدار</th>
                <th className="py-3 px-4 border-b border-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(({ id, related, value }) => (
                <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{related}</td>
                  <td className="py-3 px-4">{value}</td>
                  <td className="py-3 px-4">
                    <PinkButton
                      text="عملیات"
                      action={() => alert(`عملیات برای ${related}`)}
                      width={80}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default TDepartment;
