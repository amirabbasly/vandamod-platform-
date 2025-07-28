"use client";

import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const TCheckPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const mobileNumber = sessionStorage.getItem("UserNumber");
    if (!mobileNumber) {
      setError("شماره موبایل یافت نشد");
      return;
    }

    if (!password) {
      setError("لطفا رمز عبور را وارد کنید");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        mobileNumber,
        password,
      });

      if (response.data.success === true) {
        const user = response.data.data;
        sessionStorage.setItem("AuthToken", user.token);
        sessionStorage.setItem("RefreshToken", user.refreshToken);
        sessionStorage.setItem("UserNumber", user.mobileNumber);
        sessionStorage.setItem("FullName", user.fullName);

        setSuccess(true);
        toast.success("ورود با موفقیت انجام شد!", { duration: 2000 });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setError("رمز عبور نادرست است");
      }
    } catch (err) {
      setError("ارسال درخواست با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="relative mb-10 select-none">
        <span
          className="text-5xl md:text-6xl font-bold text-black relative z-10"
          style={{ fontFamily: "inherit" }}
        >
          ven
          <span className="inline-block relative">
            da
            <span className="absolute left-0 top-1/2 w-full h-1 border-b-4 border-pink-500 rotate-[-10deg] -translate-y-1/2 z-20" />
          </span>
        </span>
        <span
          className="text-5xl md:text-6xl font-bold text-pink-500 ml-2 relative z-10"
          style={{ fontFamily: "cursive" }}
        >
          Mode
          <span className="absolute left-0 top-1/2 w-full h-1 border-b-4 border-pink-500 rotate-[-10deg] -translate-y-1/2 z-20" />
        </span>
        <svg
          className="absolute left-0 right-0 mx-auto top-1/2 z-30"
          width="320"
          height="30"
          style={{ pointerEvents: "none" }}
        >
          <line
            x1="0"
            y1="20"
            x2="320"
            y2="10"
            stroke="#e11d48"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <form
        className="w-full max-w-sm flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <label className="block w-full text-center text-gray-400 mb-2 text-base">
          رمز عبور خود را وارد کنید
        </label>
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black rounded-full border border-gray-200 py-3 px-6 text-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition placeholder-gray-400 bg-white shadow-sm"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-pink-400 hover:bg-pink-500 text-white text-lg font-bold py-3 shadow transition disabled:opacity-60 flex items-center justify-center"
          disabled={loading}
        >
          {loading && <FaSpinner className="animate-spin mr-2" />}
          {loading ? "در حال ارسال..." : "ادامه"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm mt-2">
            درخواست با موفقیت ارسال شد!
          </div>
        )}
      </form>

      <div className="mt-8 text-center text-sm text-gray-400">
        شرایط استفاده از{" "}
        <a href="#" className="text-pink-500 underline">
          قوانین و حریم خصوصی
        </a>{" "}
        وندا مد را می‌پذیرم
      </div>
    </div>
  );
};

export default TCheckPassword;
