
import { useState, useEffect } from "react";
import Chat from "@/components/Chat";
import PasswordProtection from "@/components/PasswordProtection";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem('chat_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto w-full md:w-[70%]">
        <Chat />
      </div>
    </div>
  );
};

export default Index;
