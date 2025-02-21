
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

interface Bookmark {
  id: number;
  content: string;
  sent_at: string;
  user: string;
  sender_name: string;
}

interface BookmarkSelectorProps {
  onBookmarkSelect: (date: string) => void;
  onTabChange: (tab: string) => void;
}

const BookmarkSelector = ({ onBookmarkSelect, onTabChange }: BookmarkSelectorProps) => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: Bookmark[] }>({
    'Big Trolley': [],
    'Small Trolley': []
  });

  const fetchBookmarks = async () => {
    try {
      const { data, error } = await supabase
        .from('Bookmarks')
        .select('*')
        .order('sent_at', { ascending: false });

      if (error) throw error;

      const groupedBookmarks = data.reduce((acc: { [key: string]: Bookmark[] }, bookmark) => {
        if (!acc[bookmark.user]) {
          acc[bookmark.user] = [];
        }
        acc[bookmark.user].push(bookmark);
        return acc;
      }, {
        'Big Trolley': [],
        'Small Trolley': []
      });

      setBookmarks(groupedBookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast.error('Failed to load bookmarks');
    }
  };

  // Set up real-time subscription for bookmarks
  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel('bookmarks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Bookmarks'
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('Bookmarks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Bookmark deleted successfully');
      fetchBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      toast.error('Failed to delete bookmark');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Bookmarks</h2>
      <Tabs defaultValue="Big Trolley" onValueChange={onTabChange}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="Big Trolley" className="flex-1">Big Trolley</TabsTrigger>
          <TabsTrigger value="Small Trolley" className="flex-1">Small Trolley</TabsTrigger>
        </TabsList>

        {['Big Trolley', 'Small Trolley'].map((user) => (
          <TabsContent key={user} value={user}>
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="space-y-4">
                {bookmarks[user]?.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer relative group"
                    onClick={() => onBookmarkSelect(bookmark.sent_at)}
                  >
                    <div className="text-sm text-gray-500 mb-1">
                      {formatDate(bookmark.sent_at)}
                    </div>
                    <div className="text-sm line-clamp-2">{bookmark.content}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Sent by: {bookmark.sender_name}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(bookmark.id);
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BookmarkSelector;

