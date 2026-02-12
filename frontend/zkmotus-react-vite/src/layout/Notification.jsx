// components/CustomNotification.jsx
import React from "react";
import { BsFillSendCheckFill } from "react-icons/bs";
function Notification({ visible, title, subtitle }) {
  return (
    <div
      className={`${
        visible ? "animate-enter" : "animate-leave"
      } ring-opacity-5 pointer-events-auto z-50 flex w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="shrink-0 pt-0.5">
            <BsFillSendCheckFill size={25} />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title || ""}</p>
            <p className="mt-1 text-sm text-gray-500">{subtitle || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
