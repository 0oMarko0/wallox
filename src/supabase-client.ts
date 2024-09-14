import {createClient, PostgrestError} from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Supabase = createClient(url, apiKey)

const HandleError = (error: PostgrestError | Error | null) => {
    if (error !== null) {
        alert(error.message)
    }
}

export {
    Supabase,
    HandleError
}