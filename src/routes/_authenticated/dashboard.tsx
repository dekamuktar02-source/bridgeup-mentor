import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { workspaceOptions } from '@/lib/career-queries';
import { profileCompletion } from '@/lib/career-rules';
import { OpportunityCard } from '@/components/bridgeup/cards';
import { Brand } from '@/components/bridgeup/public-shell';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/_authenticated/dashboard')({ head: () => pageHead('Dashboard','Your BridgeUp career workspace.'), loader: ({context}) => context.queryClient.ensureQueryData(workspaceOptions), component: Page });
function Page(){ const {data:w}=useSuspenseQuery(workspaceOptions); const qc=useQueryClient(); const nav=useNavigate(); const pct=profileCompletion(w.profile); const savedIds=new Set(w.saved.map(s=>s.opportunity_id));
 async function out(){await qc.cancelQueries();qc.clear();await supabase.auth.signOut();void nav({to:'/auth',replace:true});}
 const stats=[['Profile completion',`${pct}%`],['Applications',w.counts.applications],['Shortlisted',w.counts.shortlisted],['Active mentorships',w.counts.mentorships],['Saved',w.counts.saved]] as const;
 return <div className="workspace-body"><div className="workspace-heading"><div><Brand/><h1>Welcome back, {w.profile.full_name||'there'}!</h1><p>Let's take the next step in your career. Account: {w.role.replace('_',' ')}</p></div><Button variant="outline" onClick={out}>Log out</Button></div><div className="stats-grid">{stats.map(([l,v])=><div className="stat" key={l}><div className="stat-label">{l}</div><div className="stat-value">{v}</div></div>)}</div><div className="profile-nudge"><div><h3>Profile progress</h3><progress value={pct} max={100}/></div></div><section className="workspace-section"><h2>Recommended opportunities</h2><div className="cards-grid mt-4">{w.opportunities.filter(o=>o.status==='published').slice(0,6).map((o,i)=><OpportunityCard key={o.id} opportunity={o} index={i} saved={savedIds.has(o.id)} userSkills={w.profile.skills}/>)}</div></section><section className="workspace-section"><h2>Notifications</h2>{w.notifications.length?w.notifications.map(n=><div className="activity-row" key={n.id}><div><strong>{n.title}</strong><p>{n.body}</p></div></div>):<p className="text-sm text-muted-foreground">No notifications yet.</p>}</section></div>; }
