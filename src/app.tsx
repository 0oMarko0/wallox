import { useEffect, useState } from 'react';
import { Supabase } from '@/supabase-client.ts';
import { Session } from '@supabase/supabase-js';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import Auth from '@/auth.tsx';
import Subscriptions from '@/components/subscriptions-table.tsx';
import { SiteHeader } from '@/components/header.tsx';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    Supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = Supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {!session ? (
        <div className="flex justify-center items-center h-screen p-5">
          <Auth />
        </div>
      ) : (
        <div className="flex flex-col">
          <SiteHeader />
          <div className="container mx-auto h-content mt-8">
            <Subscriptions />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
