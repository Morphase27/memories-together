
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import { WhatsAppMessage, parseWhatsAppText } from './data/messages.ts';


const Chat = () => {
  console.log("Chat component rendered");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);

  useEffect(() => {
    import('./data/conversation.json')
      .then(data => {
        // If your bundler wraps the JSON in a default export, you might need:
        const conversation = data.default || data;
        console.log("Imported conversation:", conversation);
        
        // Set messages directly from the JSON
        setMessages(conversation.messages);
      })
      .catch(error => {
        console.error("Error importing JSON:", error);
      });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Add messages as dependency

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col bg-whatsapp-background">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.content}
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
