import { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import StaffPick from "../components/StaffPick";
import {
  useDeleteNotificationMutation,
  useGetNotificationQuery,
} from "../redux/api/userSlice";
import formatDate from "../utils/formatDate";

function Notification() {
  return (
    <>
      <BaseLayout
        componentLeft={() => <Left />}
        componentRight={() => <StaffPick />}
      />
    </>
  );
}

export default Notification;

function Left() {
  const { data, isLoading, isError, refetch } = useGetNotificationQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      staleTime: 0,
    }
  );
  const [notifications, setNotifications] = useState([]); // Local state for notifications
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await deleteNotification(id).unwrap(); // unwrap() to get the response or error directly
      console.log(response);

      // Optionally, you can update local state after deleting the notification.
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );

      refetch(); // Ensure the notifications are refetched after deletion
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  // Effect to set notifications when data changes
  useEffect(() => {
    if (data) {
      console.log("Data received:", data);
      if (data.notifications) {
        setNotifications(data.notifications); // Update local state with fresh data
      }
    }
  }, [data]); // This effect runs whenever 'data' changes

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-6 md:py-10">
      <div className="font-bold text-4xl pb-10 border-b">Notification</div>
      {notifications.length > 0 ? (
        notifications.map((i, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b"
          >
            <div>
              <div className="text-gray-950 mr-2">{i.message}</div>
              <div className="text-gray-700 text-xs py-2">
                {formatDate(i.date)}
              </div>
            </div>
            <div>
              <button
                onClick={() => handleDelete(i._id)}
                className="px-4 py-2 border rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap"
              >
                Mark as read
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="py-5">No Notifications</div>
      )}
    </div>
  );
}
