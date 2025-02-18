
import React from 'react';
import { cn } from "@/lib/utils";

interface MessageProps {
  text: string;
  timestamp: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ text, timestamp, isSent }) => {
  return (
    <div
      className={cn(
        "flex mb-2 animate-message-appear opacity-0",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] p-2 rounded-lg shadow-sm relative",
          isSent ? "bg-whatsapp-sent" : "bg-whatsapp-received"
        )}
      >
        <p className="text-whatsapp-text text-sm break-words">{text}</p>
        <span className="text-[11px] text-whatsapp-timestamp block text-right mt-1">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default Message;
