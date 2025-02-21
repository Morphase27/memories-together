
import React from 'react';
import profilePic from './data/profile.jpg';

interface ChatHeaderProps {
  children?: React.ReactNode;
}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  return (
    <div className="bg-whatsapp-header px-4 py-2 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-semibold text-whatsapp-text">Big Trolley</h1>
          <p className="text-xs text-whatsapp-timestamp">online</p>
        </div>
      </div>
      <div className="flex items-center">
        {children}
      </div>
    </div>
  );
};

export default ChatHeader;

