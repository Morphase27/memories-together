
import React, { useEffect, useRef } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';

// This is temporary sample data - you'll replace this with your text file data
const sampleMessages = [
  { text: "Hey, how are you?", timestamp: "10:00 AM", isSent: false },
  { text: "I'm good, thanks! How about you?", timestamp: "10:01 AM", isSent: true },
  { text: "Pretty good! Did you see the new updates?", timestamp: "10:02 AM", isSent: false },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true },
  { text: "Yes, they look amazing!", timestamp: "10:03 AM", isSent: true }
];

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col bg-whatsapp-background">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {sampleMessages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            timestamp={message.timestamp}
            isSent={message.isSent}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chat;
