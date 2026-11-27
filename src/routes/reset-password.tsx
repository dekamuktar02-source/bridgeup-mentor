import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PublicShell } from '@/components/bridgeup/public-shell';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/reset-password')({ head: () => pageHead('Reset password','Choose a new BridgeUp password.'), component: Page });
function Page(){ const nav=useNavigate(); const [pw,setPw]=useState(''); const [err,setErr]=useState('');
 async function submit(e:React.FormEvent){e.preventDefault();const {error}=await supabase.auth.updateUser({password:pw}); if(error) setErr(error.message); else void nav({to:'/dashboard'});}
 return <PublicShell><div className="auth-page"><form className="auth-form" onSubmit={submit}><h1>Set a new password</h1>{err&&<div className="form-error">{err}</div>}<div className="form-grid"><label>New password<input type="password" minLength={8} required value={pw} onChange={e=>setPw(e.target.value)}/></label><Button type="submit">Update password</Button></div></form></div></PublicShell>; }
