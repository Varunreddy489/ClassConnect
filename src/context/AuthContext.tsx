import {
  FC,
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { axiosInstance } from "@/lib/axios";
import { AuthUserType } from "@/types/Client-types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<{
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
  error: any;
}>({ authUser: null, setAuthUser: () => {}, isLoading: true, error: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/student/me");
        if (!res) {
          throw new Error("User not authenticated");
        }
        localStorage.setItem("num", JSON.stringify(res.data.isStudent.id));

        setAuthUser(res.data);
      } catch (error: any) {
        if (error.response.data.error === "Unauthorized - Token has expired") {
          navigate("/login");
        } else {
          setError(error);
          console.error("error in authContext:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ authUser, isLoading, setAuthUser, error }}>
      {children}
    </AuthContext.Provider>
  );
};
