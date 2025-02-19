import React from 'react';
import profilePic from './data/profile.jpg'; // Ensure profile.jpg is in the same folder

const ChatHeader = () => {
  return (
    <div className="bg-whatsapp-header px-6 py-4 flex items-center gap-4 border-b border-gray-200">
      <div className="w-15 h-15 rounded-full overflow-hidden bg-gray-200">
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
  );
};

export default ChatHeader;