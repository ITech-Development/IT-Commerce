import React from "react";

const ModalNotification = () => {
  const { data: notif } = useGetNotificationCountQuery()
  return (
    <div className="modal">
      {/* Modal content */}
      <div className="modal-content">
        <span className="close" >
          &times;
        </span>
        <p>Modal content goes here.</p>
      </div>
    </div>
  );
};

export default ModalNotification;
