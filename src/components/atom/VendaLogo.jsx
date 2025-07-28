import Image from "next/image";

const VendaLogo = ({ width = 100 , height = 50 }) => {
  return (
    <Image
      src="/logo/Logo.png"
      alt="Venda Logo"
      width={width}
      height={height}
      style={{ objectFit: "contain" }}
      priority 
    />
  );
};

export default VendaLogo;
