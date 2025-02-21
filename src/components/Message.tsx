
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import BookmarkButton from './BookmarkButton';

interface MessageProps {
  text: string;
  timestamp: string;
  isSent: boolean;
  date: string;
  selectedTab: string;
  onBookmarkAdded: () => void;
  isHighlighted?: boolean;
}

const Message: React.FC<MessageProps> = ({ 
  text, 
  timestamp, 
  isSent, 
  date, 
  selectedTab,
  onBookmarkAdded,
  isHighlighted = false 
}) => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (isHighlighted) {
      setHighlight(true);
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setHighlight(false);
    }
  }, [isHighlighted]);

  return (
    <div
      className={cn(
        "flex mb-2 animate-message-appear opacity-0 group",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] p-2 rounded-lg shadow-sm relative transition-all duration-300",
          isSent ? "bg-whatsapp-sent" : "bg-whatsapp-received",
          highlight && "ring-2 ring-blue-500 ring-offset-2"
        )}
      >
        <div className="flex justify-between items-start gap-2">
          <p className="text-whatsapp-text text-sm break-words">{text}</p>
          <BookmarkButton 
            message={{ content: text, timestamp, date, isSent }} 
            selectedTab={selectedTab}
            onBookmarkAdded={onBookmarkAdded}
          />
        </div>
        <span className="text-[11px] text-whatsapp-timestamp block text-right mt-1">
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default Message;
