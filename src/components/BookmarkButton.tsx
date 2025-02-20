
import React from 'react';
import { BookmarkPlus } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

interface BookmarkButtonProps {
  message: {
    content: string;
    timestamp: string;
    date: string;
    isSent: boolean;
  };
  selectedTab: string;
}

const BookmarkButton = ({ message, selectedTab }: BookmarkButtonProps) => {
  const handleBookmark = async () => {
    try {
      const { data, error } = await supabase
        .from('Bookmarks')
        .insert([
          {
            content: message.content,
            sent_at: `${message.date} ${message.timestamp}`,
            user: selectedTab, // Use the selected tab as the user
            sender_name: message.isSent ? 'Small Trolley' : 'Big Trolley' // Reverse the logic as per requirement
          }
        ]);

      if (error) throw error;
      toast.success('Message bookmarked successfully!');
    } catch (error) {
      console.error('Error bookmarking message:', error);
      toast.error('Failed to bookmark message');
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="opacity-0 group-hover:opacity-100 transition-opacity"
      title="Bookmark message"
    >
      <BookmarkPlus className="h-4 w-4 text-gray-500 hover:text-gray-700" />
    </button>
  );
};

export default BookmarkButton;
