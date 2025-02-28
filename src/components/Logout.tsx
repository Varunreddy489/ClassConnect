import { useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/lib/axios";
import { useMessageStore } from "@/stores/useMessageStore";

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { disconnectSocket } = useMessageStore();

  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/auth/student/logout", {});
      console.log(response.data);
      disconnectSocket();
      navigate("/login");
    } catch (err) {
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={logout}
        className="relative flex flex-row items-center h-11 w-full focus:outline-none  border-l-4 border-transparent hover:border-indigo-500"
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span className="inline-flex justify-center items-center ml-4">
            <LogOut />
          </span>
        )}
      </button>
      {error && <div className="text-red-500">{error}</div>}{" "}
    </div>
  );
};

export default Logout;
