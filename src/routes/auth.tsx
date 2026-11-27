import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PublicShell } from '@/components/bridgeup/public-shell';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/auth')({ head: () => pageHead('Log in','Sign in to your BridgeUp account.'), component: Page });
function Page(){ const nav=useNavigate(); const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const [err,setErr]=useState(''); const [msg,setMsg]=useState('');
 async function submit(e:React.FormEvent){e.preventDefault();setErr('');const {error}=await supabase.auth.signInWithPassword({email,password:pw}); if(error) setErr(error.message); else void nav({to:'/dashboard'});}
 async function reset(){ if(!email){setErr('Enter your email first.');return;} const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/reset-password`}); if(error) setErr(error.message); else setMsg('Check your email for a reset link.'); }
 return <PublicShell><div className="auth-page"><form className="auth-form" onSubmit={submit}><h1>Welcome back</h1><p>Log in to continue your career journey.</p>{err&&<div className="form-error">{err}</div>}{msg&&<div className="form-success">{msg}</div>}<div className="form-grid"><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required value={pw} onChange={e=>setPw(e.target.value)}/></label><Button type="submit" size="lg">Log in</Button><Button type="button" variant="link" onClick={reset}>Forgot password?</Button></div><div className="auth-bottom">New here? <Link to="/register">Create an account</Link></div></form></div></PublicShell>; }
