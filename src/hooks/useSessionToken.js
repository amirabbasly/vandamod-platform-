// hooks/useSessionToken.js
import { useEffect, useState } from "react";

const useSessionToken = () => {
  const [hasToken, setHasToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("AuthToken");
      setHasToken(!!token);
    }
  }, []);

  return hasToken;
};

export default useSessionToken;
