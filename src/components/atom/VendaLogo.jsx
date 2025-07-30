import Image from "next/image";
import Link from "next/link";

const VendaLogo = ({ width = 100, height = 50 }) => {
  return (
    <Link href="/" aria-label="رفتن به صفحه اصلی" className="inline-block cursor-pointer">
      <Image
        src="/logo/Logo.png"
        alt="Venda Logo"
        width={width}
        height={height}
        style={{ objectFit: "contain" }}
        priority
      />
    </Link>
  );
};

export default VendaLogo;
