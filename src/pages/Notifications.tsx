import { useEffect } from "react";

import Spinner from "@/components/Spinner";
import NotificationCard from "@/components/NotificationCard";
import { useNotificationStore } from "@/stores/useNotificationStore";

const Notifications = () => {
  const { isLoading, error, getNotifications, notifications } =
    useNotificationStore();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error} </div>;

  useEffect(() => {
    getNotifications();
  }, []);

  const user = localStorage.getItem("user");

  const name = user ? JSON.parse(user).name : null;

  if (notifications.length === 0) return <div>No notifications</div>;

  return (
    <div className=" flex flex-col space-y-3 m-3 ">
      <h1 className="text-center  ">Notifications to {name}</h1>
      {notifications?.map((notification: any) => (
        <NotificationCard key={notification.id} data={notification} />
      ))}
    </div>
  );
};

export default Notifications;
