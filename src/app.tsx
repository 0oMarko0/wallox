import Auth from "@/auth.tsx";
import {useEffect, useState} from "react";
import {Supabase} from "@/supabase-client.ts";
import Subscriptions from "@/components/subscriptions-table.tsx";
import {Session} from "@supabase/supabase-js";

function App() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        Supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const { data } = Supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => data.subscription.unsubscribe();
    }, [])

    return (
        <div className="flex justify-center items-center h-screen p-5">
            {!session ? <Auth /> : <Subscriptions />}
        </div>
    )
}

export default App
