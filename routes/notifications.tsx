import Header from "../components/Header.tsx";
import NotificationsFeed from "../islands/NotificationsFeed.tsx";

const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
