import { useEffect, useState } from "react";

const useFullName = () => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = sessionStorage.getItem("FullName");
      if (name) {
        setFullName(name);
      }
    }
  }, []);

  return fullName;
};

export default useFullName;
