import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { z } from 'zod';
export const getCatalog = createServerFn({method:'GET'}).handler(async () => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Career listings are temporarily unavailable.');
  const db = createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_') && headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
  const [opps,mentors] = await Promise.all([db.from('opportunities').select('*').eq('status','published').order('created_at',{ascending:false}).limit(100),db.from('mentor_listings').select('*').order('name').limit(100)]);
  if(opps.error) throw new Error(opps.error.message); if(mentors.error) throw new Error(mentors.error.message);
  return {opportunities:opps.data,mentors:mentors.data};
});
export const getWorkspace = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
 const db=context.supabase; const uid=context.userId;
 const [p,r]=await Promise.all([db.from('profiles').select('*').eq('id',uid).single(),db.from('user_roles').select('role').eq('user_id',uid).single()]);
 if(p.error || r.error) throw new Error('Your account could not be loaded.');
 const role=r.data.role;
 const [opps,apps,saved,mentors,mentorships,sessions,notifications,projects,orgs,people,roles,doc,appCount,savedCount,shortCount,activeCount,sessionCount] = await Promise.all([
 db.from('opportunities').select('*').order('created_at',{ascending:false}).limit(100),
 db.from('applications').select('*, opportunities(title,organisation), profiles(full_name,headline,skills,career_goals,biography)').order('created_at',{ascending:false}).limit(100),
 db.from('saved_opportunities').select('*').eq('user_id',uid).limit(100),
 db.from('mentor_listings').select('*').order('name').limit(100),
 db.from('mentorships').select('*, mentor_listings(name,title,user_id), profiles(full_name,headline,skills,career_goals)').order('created_at',{ascending:false}).limit(100),
 db.from('sessions').select('*').order('scheduled_at').limit(100),
 db.from('notifications').select('*').eq('user_id',uid).order('created_at',{ascending:false}).limit(50),
 db.from('portfolio_projects').select('*').eq('user_id',uid).order('created_at',{ascending:false}).limit(100),
 db.from('organisations').select('*').order('name').limit(100),
 db.from('profiles').select('*').order('created_at',{ascending:false}).limit(100),
 db.from('user_roles').select('*').limit(100),
 db.from('profile_documents').select('*').eq('user_id',uid).maybeSingle(),
 db.from('applications').select('id',{count:'exact',head:true}),
 db.from('saved_opportunities').select('user_id',{count:'exact',head:true}).eq('user_id',uid),
 db.from('applications').select('id',{count:'exact',head:true}).eq('status','Shortlisted'),
 db.from('mentorships').select('id',{count:'exact',head:true}).eq('status','Active'),
 db.from('sessions').select('id',{count:'exact',head:true}).eq('completed',true)
 ]);
 for(const response of [opps,apps,saved,mentors,mentorships,sessions,notifications,projects,orgs,people,roles,doc,appCount,savedCount,shortCount,activeCount,sessionCount]) if(response.error) throw new Error(response.error.message);
 let avatar: string | null=null;
 if(p.data.avatar_url) { const photo=await db.storage.from('profile-photos').createSignedUrl(p.data.avatar_url,3600); avatar=photo.data?.signedUrl??null; }
 return {profile:p.data,role,userId:uid,avatar,opportunities:opps.data??[],applications:apps.data??[],saved:saved.data??[],mentors:mentors.data??[],mentorships:mentorships.data??[],sessions:sessions.data??[],notifications:notifications.data??[],projects:projects.data??[],organisations:orgs.data??[],people:people.data??[],roles:roles.data??[],document:doc.data,counts:{applications:appCount.count??0,saved:savedCount.count??0,shortlisted:shortCount.count??0,mentorships:activeCount.count??0,completedSessions:sessionCount.count??0}};
});
export const changeUserRole = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({userId:z.string().uuid(),role:z.enum(['job_seeker','mentor','employer','admin'])})).handler(async({data,context})=>{
 const check=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); if(check.error || !check.data) throw new Error('Administrator access required.');
 if(data.userId===context.userId) throw new Error('You cannot change your own administrator role.');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server'); const result=await supabaseAdmin.from('user_roles').update({role:data.role}).eq('user_id',data.userId);if(result.error)throw new Error(result.error.message); return {ok:true};
});
export type Workspace = Awaited<ReturnType<typeof getWorkspace>>;
export type Catalog = Awaited<ReturnType<typeof getCatalog>>;
export type Opportunity = Catalog['opportunities'][number];
export type Mentor = Catalog['mentors'][number];
