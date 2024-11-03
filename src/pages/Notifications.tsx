import NotificationCard from "@/components/NotificationCard";
import Spinner from "@/components/Spinner";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const Notifications = () => {
  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get("/notifications");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("error in getNotifications:", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (error) {
    return (
      <div className="flex justify-center  items-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className=" flex flex-col space-y-3 m-3 ">
      <h1 className="text-center  ">Notifications to Varunreddy</h1>
      {data?.map((notification: any) => (
        <NotificationCard key={notification.id} data={notification} />
      ))}
    </div>
  );
};

export default Notifications;
