import { useRouter } from 'next/router';

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    console.log("Logging out...");
    sessionStorage.removeItem("AuthToken");
    router.push("/"); // هدایت به صفحه اصلی
  };

  return logout;
};

export default useLogout;