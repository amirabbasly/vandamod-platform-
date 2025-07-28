'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

export default function AuthorizationForOtp() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const router = useRouter();
  const [phone, setPhone] = useState(null);
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    setPhone(sessionStorage.getItem("UserNumber"));
  }, []);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[value.length - 1];
    setOtp(newOtp);
    if (idx < 3 && value) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    try {
      const res = await axiosInstance.post("/api/auth/verify-code", {
        mobileNumber: phone,
        password: otpCode,
      });
      setVerify(res.data);
      router.push('/');
    } catch (err) {
      console.error('Error verifying code:', err);
    }
  };

  const handleResend = (e) => {
    e.preventDefault();
    alert('کد مجدد ارسال شد!');
  };

  if (!phone) return <div>در حال بارگذاری شماره...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="relative mb-10 select-none">
        <span className="text-5xl md:text-6xl font-bold text-black relative z-10" style={{ fontFamily: 'inherit' }}>
          ven<span className="inline-block relative">da
            <span className="absolute left-0 top-1/2 w-full h-1 border-b-4 border-pink-500 rotate-[-10deg] -translate-y-1/2 z-20"></span>
          </span>
        </span>
        <span className="text-5xl md:text-6xl font-bold text-pink-500 ml-2 relative z-10" style={{ fontFamily: 'cursive' }}>
          Mode
          <span className="absolute left-0 top-1/2 w-full h-1 border-b-4 border-pink-500 rotate-[-10deg] -translate-y-1/2 z-20"></span>
        </span>
        <svg className="absolute left-0 right-0 mx-auto top-1/2 z-30" width="320" height="30" style={{ pointerEvents: 'none' }}>
          <line x1="0" y1="20" x2="320" y2="10" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      <div className="text-gray-400 text-base mb-8 text-center">
        کد پیامک شده به شماره <span className="font-bold text-gray-500">{phone}</span> را وارد کنید
      </div>

      <form className="w-full max-w-xs flex flex-col items-center gap-8" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-4 w-full mb-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => inputsRef.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              className="w-12 h-12 text-black md:w-16 md:h-16 rounded-lg border border-gray-300 text-center text-2xl md:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white shadow-sm"
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-pink-400 hover:bg-pink-500 text-white text-lg font-bold py-3 shadow transition"
        >
          تایید
        </button>
      </form>

      <div className="mt-6 text-center">
        <button onClick={handleResend} className="text-blue-500 text-sm hover:underline">ارسال مجدد کد</button>
      </div>
    </div>
  );
}
