import React, { useState, useEffect, useRef } from "react";
import { chatroom } from "@/API/chatroom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

export const useKeypadInputTracker = () => {
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasSentFirstRequest = useRef(false);

  const accessToken = useAuthStore((state) => state.auth.accessToken);
  const user = useAuthStore((state) => state.auth.user);

  const { mutate } = useMutation({
    mutationFn: chatroom.updateTypingStatus,
    onSuccess: (response: any) => {
      console.log("update typing:", response?.status);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  useEffect(() => {
    const updateTypingStatusHandler = () => {
      mutate({
        userID: user.id,
        startedTypingAt: new Date().toISOString(),
        token: accessToken,
      });
    };

    if (isTyping) {
      if (!hasSentFirstRequest.current) {
        // Send first request immediately when typing starts
        // sendRequest(input);
        updateTypingStatusHandler();
        hasSentFirstRequest.current = true;
      }

      // Start interval if not already running
      if (!requestIntervalRef.current) {
        requestIntervalRef.current = setInterval(() => {
          updateTypingStatusHandler();
        }, 4000);
      }
    }

    if (!isTyping) {
      // Clear request interval when user stops typing
      if (requestIntervalRef.current) {
        clearInterval(requestIntervalRef.current);
        requestIntervalRef.current = null;
      }
      hasSentFirstRequest.current = false; // Reset when typing stops
    }

    return () => {
      if (requestIntervalRef.current) {
        clearInterval(requestIntervalRef.current);
      }
    };
  }, [isTyping]);

  const keypadInputTracker = (text: string) => {
    if (!isTyping) {
      // Start typing detection only if it was previously stopped
      setIsTyping(() => true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Reset typing state after 4 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(() => false);
    }, 4000);
  };

  return { keypadInputTracker };
};
