import { createContext, useEffect, useState } from "react";
import { getMyDetails } from "../service/auth";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    getMyDetails()
      .then((res) => {
        if (res?.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Authentication error:", err);

        if (err?.response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
          localStorage.removeItem("REFRESH_TOKEN");
        }

        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};