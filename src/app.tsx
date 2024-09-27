// import { useEffect, useState } from 'react';
// import { Supabase } from '@/supabase-client.ts';
// import { Session } from '@supabase/supabase-js';
// import { ThemeProvider } from '@/components/theme-provider.tsx';
// import Auth from '@/auth.tsx';
// import Subscriptions from '@/components/subscriptions-table.tsx';
// import { createRouter } from '@tanstack/react-router';
// import { routeTree } from '@/routeTree.gen.ts';
//
// const router = createRouter({ routeTree });
//
// // Register the router instance for type safety
// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router;
//   }
// }
//
// function App() {
//   const [session, setSession] = useState<Session | null>(null);
//
//   useEffect(() => {
//     Supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });
//
//     const { data } = Supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//
//     return () => data.subscription.unsubscribe();
//   }, []);
//
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       {!session ? (
//         <div className="flex justify-center items-center h-screen p-5">
//           <Auth />
//         </div>
//       ) : (
//         <div className="flex flex-col">
//           <div className="container mx-auto h-content mt-8">
//             <Subscriptions />
//           </div>
//         </div>
//       )}
//     </ThemeProvider>
//   );
// }
//
// export default App;
