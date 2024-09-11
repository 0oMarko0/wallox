import Auth from "@/Auth.tsx";
import {useEffect, useState} from "react";
import {supabase} from "@/supabaseClient.ts";
import Subscriptions from "@/Subscriptions.tsx";
import {Session} from "@supabase/supabase-js";

function App() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
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
