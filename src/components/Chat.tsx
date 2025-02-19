import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import { WhatsAppMessage, parseWhatsAppText } from './data/messages';

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);

  useEffect(() => {
    import('./data/conversation.json').then(data => {
      const parsedConversation = parseWhatsAppText(JSON.stringify(data));
      setMessages(parsedConversation.messages);
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
