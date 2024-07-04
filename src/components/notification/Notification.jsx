import React, { useState, useEffect } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Notification = () => {
  const UserInfo = useSelector(
    (state) => state?.Permissions?.user_info?.access
  );

  const notification_ws_Ref = useRef(null);

  useEffect(() => {
    if (UserInfo) {
      notification_ws_Ref.current = new WebSocket(
        `wss://api.development.gigupweb.com/ws/notification/?Authorization=${UserInfo}`
      );

      notification_ws_Ref.current.onopen = () => {
        console.log("WebSocket connected");
      };

      notification_ws_Ref.current.onmessage = (event) => {
        // Handle incoming WebSocket messages here
        let result = JSON.parse(event.data);
        toast.success(result?.message || "");
        // You can process the received data and update your component state
      };

      notification_ws_Ref.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      notification_ws_Ref.current.onclose = () => {
        console.log("WebSocket closed");
      };
    }

    return () => {
      if (notification_ws_Ref.current) {
        notification_ws_Ref.current.close();
      }
    };
  }, [UserInfo]);

  return null;
};

export default Notification;
