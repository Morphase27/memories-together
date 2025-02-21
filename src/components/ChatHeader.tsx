
import React, { useState } from 'react';
import profilePic from './data/profile.jpg';
import ProfileImageModal from './ProfileImageModal';

interface ChatHeaderProps {
  children?: React.ReactNode;
}

const ChatHeader = ({ children }: ChatHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-whatsapp-header px-4 py-2 flex items-center justify-between border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIsModalOpen(true)}
          >
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
      <div className="h-[64px]"></div>
      <ProfileImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={profilePic}
      />
    </>
  );
};

export default ChatHeader;
