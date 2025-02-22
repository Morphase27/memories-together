
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import DateSelector from './DateSelector';
import BookmarkSelector from './BookmarkSelector';
import { WhatsAppMessage } from './data/messages';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from 'lucide-react';

const MESSAGES_PER_PAGE = 20;

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [allMessages, setAllMessages] = useState<WhatsAppMessage[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Big Trolley');
  const [highlightedMessageTime, setHighlightedMessageTime] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    import('./data/conversation.json')
      .then(data => {
        const conversation = data.default || data;
        const messages = conversation.messages;
        setAllMessages(messages);
        const startIndex = Math.max(0, messages.length - MESSAGES_PER_PAGE);
        setMessages(messages.slice(startIndex));
      })
      .catch(error => {
        console.error("Error importing JSON:", error);
      });
  }, []);

  const jumpToDate = (year: string, month: string) => {
    const targetDate = `${month}/${year}`;
    const targetIndex = allMessages.findIndex(message => message.date.includes(targetDate));
    
    if (targetIndex !== -1) {
      const startIndex = Math.max(0, targetIndex - Math.floor(MESSAGES_PER_PAGE / 2));
      const endIndex = Math.min(allMessages.length, startIndex + MESSAGES_PER_PAGE);
      setMessages(allMessages.slice(startIndex, endIndex));
      setPage(Math.ceil(endIndex / MESSAGES_PER_PAGE));
      setIsSheetOpen(false);
    }
  };

  const parseDateTime = (dateStr: string, timeStr: string) => {
    const [day, month, year] = dateStr.split('/').map(num => num.trim());
    const formattedTime = timeStr.includes(':') ? timeStr : `${timeStr}:00`;
    const dateTimeStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${formattedTime}`;
    return new Date(dateTimeStr);
  };

  const jumpToTimestamp = (timestamp: string) => {
    // Parse the timestamp from the bookmark format "DD/MM/YYYY, HH:mm"
    const [date, time] = timestamp.split(',').map(str => str.trim());
    const targetTime = parseDateTime(date, time);

    console.log('Target timestamp:', targetTime.toISOString());

    const targetIndex = allMessages.findIndex(message => {
      try {
        const messageTime = parseDateTime(message.date, message.timestamp);
        const timeDiff = Math.abs(messageTime.getTime() - targetTime.getTime());
        
        // Log comparison details for debugging
        console.log('Message time:', messageTime.toISOString());
        console.log('Time difference:', timeDiff);
        console.log('Message content:', message.content);
        
        // Consider messages within 1 second to be the same
        return timeDiff < 1000;
      } catch (error) {
        console.error('Error comparing dates:', error);
        return false;
      }
    });

    console.log('Found message index:', targetIndex);

    if (targetIndex !== -1) {
      const startIndex = Math.max(0, targetIndex - Math.floor(MESSAGES_PER_PAGE / 2));
      const endIndex = Math.min(allMessages.length, startIndex + MESSAGES_PER_PAGE);
      setMessages(allMessages.slice(startIndex, endIndex));
      setPage(Math.ceil(endIndex / MESSAGES_PER_PAGE));
      setHighlightedMessageTime(`${allMessages[targetIndex].date} ${allMessages[targetIndex].timestamp}`);
      setIsSheetOpen(false);

      // Scroll to the highlighted message after a short delay to ensure the DOM has updated
      setTimeout(() => {
        const messageElements = document.querySelectorAll('.animate-message-appear');
        const targetElement = messageElements[targetIndex - startIndex];
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    if (scrollTop < 100) {
      loadMoreOlderMessages();
    }
    
    if (scrollHeight - (scrollTop + clientHeight) < 100) {
      loadMoreNewerMessages();
    }
  };

  const loadMoreOlderMessages = () => {
    if (isLoading || messages.length === 0) return;

    const firstMessageIndex = allMessages.indexOf(messages[0]);
    if (firstMessageIndex <= 0) return;

    setIsLoading(true);
    setTimeout(() => {
      const startIndex = Math.max(0, firstMessageIndex - MESSAGES_PER_PAGE);
      const newMessages = allMessages.slice(startIndex, firstMessageIndex + messages.length);
      setMessages(newMessages);
      setIsLoading(false);
    }, 500);
  };

  const loadMoreNewerMessages = () => {
    if (isLoading || messages.length === 0) return;

    const lastMessageIndex = allMessages.indexOf(messages[messages.length - 1]);
    if (lastMessageIndex >= allMessages.length - 1) return;

    setIsLoading(true);
    setTimeout(() => {
      const endIndex = Math.min(allMessages.length, lastMessageIndex + MESSAGES_PER_PAGE + 1);
      const newMessages = allMessages.slice(messages[0] ? allMessages.indexOf(messages[0]) : 0, endIndex);
      setMessages(newMessages);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (messages.length === MESSAGES_PER_PAGE) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookmarkAdded = () => {
  };

  const renderMessages = () => {
    let currentDate = '';
    
    return messages.map((message, index) => {
      const messageDate = message.date;
      let dateHeader = null;

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        dateHeader = (
          <div key={`date-${messageDate}`} className="flex justify-center my-4">
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
              {messageDate}
            </span>
          </div>
        );
      }

      const isHighlighted = highlightedMessageTime === `${message.date} ${message.timestamp}`;

      const key = `message-group-${index}`;
      return (
        <React.Fragment key={key}>
          {dateHeader}
          <Message
            text={message.content}
            timestamp={message.timestamp}
            date={message.date}
            isSent={message.isSent}
            selectedTab={selectedTab}
            onBookmarkAdded={handleBookmarkAdded}
            isHighlighted={isHighlighted}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col bg-whatsapp-background relative">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <ChatHeader>
          <SheetTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <SlidersHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </SheetTrigger>
        </ChatHeader>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
          <div className="p-4 space-y-4">
            <DateSelector onDateSelect={jumpToDate} />
            <BookmarkSelector 
              onBookmarkSelect={jumpToTimestamp}
              onTabChange={setSelectedTab}
            />
          </div>
        </SheetContent>
      </Sheet>
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
        {renderMessages()}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Chat;
