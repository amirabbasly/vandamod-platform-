"use client";

import VendaLogo from "@/components/atom/VendaLogo";
import SearchBox from "@/components/molcule/SearchBox";
import PinkButton from "@/components/atom/PinkButton";
import { MdOutlineShoppingCart , MdNotificationsActive   } from "react-icons/md";
import Link from "next/link";
import useSessionToken from "@/hooks/useSessionToken";
import UserDropdown from "@/components/molcule/UserDropdown";

const Header = () => {
  const hasToken = useSessionToken();

  return (
    <header className="w-full flex flex-row-reverse justify-between items-center bg-white px-6 py-3">
      {/* لوگو سمت راست */}
      <VendaLogo width={180} height={80} />

      {/* جستجوگر در وسط */}
      <div className="flex-1 flex justify-center">
        <SearchBox />
      </div>

      {/* دکمه یا Dropdown سمت چپ */}
      <div className="flex items-center gap-4">
        {hasToken === null ? null : hasToken ? (
          <UserDropdown />
        ) : (
          <Link href="/SignIn">
            <PinkButton text="ورود / ثبت‌نام" />
          </Link>
        )}
        <MdOutlineShoppingCart  size={25} color="#E90089" />
        <MdNotificationsActive   size={25} color="#E90089" />
      </div>
    </header>
  );
};

export default Header;
