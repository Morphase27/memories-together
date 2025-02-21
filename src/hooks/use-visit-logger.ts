
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export const useVisitLogger = () => {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        const { error } = await supabase.functions.invoke('log-visit', {
          body: {
            path: location.pathname,
            referrer: document.referrer
          }
        });

        if (error) {
          console.error('Error logging visit:', error);
        }
      } catch (error) {
        console.error('Error invoking log-visit function:', error);
      }
    };

    logVisit();
  }, [location.pathname]);
};
