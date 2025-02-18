
import { User } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="bg-whatsapp-header px-4 py-2 flex items-center gap-3 border-b border-gray-200">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <User className="w-6 h-6 text-gray-500" />
      </div>
      <div>
        <h1 className="font-semibold text-whatsapp-text">Chat Title</h1>
        <p className="text-xs text-whatsapp-timestamp">online</p>
      </div>
    </div>
  );
};

export default ChatHeader;
