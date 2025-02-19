
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import { WhatsAppMessage } from './data/messages';

const MESSAGES_PER_PAGE = 20; // Number of messages to load at once

const Chat = () => {
  console.log("Chat component rendered");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [allMessages, setAllMessages] = useState<WhatsAppMessage[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial messages
  useEffect(() => {
    import('./data/conversation.json')
      .then(data => {
        const conversation = data.default || data;
        const messages = conversation.messages;
        setAllMessages(messages);
        // Load initial batch of most recent messages from the end
        const startIndex = Math.max(0, messages.length - MESSAGES_PER_PAGE);
        setMessages(messages.slice(startIndex));
      })
      .catch(error => {
        console.error("Error importing JSON:", error);
      });
  }, []);

  // Handle scroll event
  const handleScroll = () => {
    if (!scrollContainerRef.current || isLoading) return;

    const { scrollTop } = scrollContainerRef.current;
    
    // Load more when user scrolls near the top
    if (scrollTop < 100) {
      loadMoreMessages();
    }
  };

  const loadMoreMessages = () => {
    if (isLoading || messages.length >= allMessages.length) return;

    setIsLoading(true);
    const nextPage = page + 1;
    const startIndex = Math.max(0, allMessages.length - (MESSAGES_PER_PAGE * nextPage));
    
    // Simulate loading delay
    setTimeout(() => {
      const newMessages = allMessages.slice(startIndex);
      setMessages(newMessages);
      setPage(nextPage);
      setIsLoading(false);
    }, 500);
  };

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messages.length === MESSAGES_PER_PAGE) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col bg-whatsapp-background">
      <ChatHeader />
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4"
        onScroll={handleScroll}
      >
        {isLoading && (
          <div className="text-center py-2 text-gray-500">
            Loading more messages...
          </div>
        )}
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
