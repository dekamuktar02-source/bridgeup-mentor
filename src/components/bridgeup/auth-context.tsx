import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
const AuthContext=createContext<{user:User|null;loading:boolean}>({user:null,loading:true});
export function AuthProvider({children}:{children:ReactNode}) {
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const router=useRouter();const queryClient=useQueryClient();
 useEffect(()=>{let live=true;void supabase.auth.getUser().then(({data})=>{if(live){setUser(data.user);setLoading(false);}});const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{if(event!=='SIGNED_IN'&&event!=='SIGNED_OUT'&&event!=='USER_UPDATED')return;setUser(session?.user??null);setLoading(false);if(event==='SIGNED_OUT'){queryClient.removeQueries({queryKey:['workspace']});}else{void queryClient.invalidateQueries();}void router.invalidate();});return()=>{live=false;subscription.unsubscribe();};},[router,queryClient]);
 return <AuthContext.Provider value={{user,loading}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
