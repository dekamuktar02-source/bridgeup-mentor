import type { Database } from '@/integrations/supabase/types';
export type Role = Database['public']['Enums']['app_role'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export const accountTypes = ['job_seeker', 'mentor', 'employer'] as const;
export const applicationStatuses = ['Submitted', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected', 'Withdrawn'] as const;
export function registrationRole(value: string): Exclude<Role, 'admin'> { return value === 'mentor' || value === 'employer' ? value : 'job_seeker'; }
export function skillsMatch(skills: string[], required: string[]): number { if (!required.length) return 0; const normalized = new Set(skills.map(s => s.trim().toLowerCase())); return Math.round(required.filter(s => normalized.has(s.trim().toLowerCase())).length / required.length * 100); }
export function profileCompletion(profile: Partial<Profile>): number { const fields = [profile.full_name,profile.headline,profile.location,profile.biography,profile.education,profile.work_experience,profile.skills?.length,profile.career_goals,profile.certifications,profile.portfolio_url]; return fields.filter(Boolean).length * 10; }
export function canApply(role: Role, status: string, deadline: string, today: string): boolean { return role === 'job_seeker' && status === 'published' && deadline >= today; }
export function initials(name: string) { return name.split(' ').filter(Boolean).slice(0,2).map(n=>n[0]).join(''); }
export function safeUrl(value: string): string | undefined { try { const u = new URL(value); return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : undefined; } catch { return undefined; } }
