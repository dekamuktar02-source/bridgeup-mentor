import { describe, expect, it } from 'vitest';
import { registrationRole, canApply, skillsMatch, profileCompletion, applicationStatuses } from '@/lib/career-rules';
describe('BridgeUp career rules',()=>{
 it('does not permit administrator self-registration',()=>{expect(registrationRole('admin')).toBe('job_seeker');});
 it('supports the three public account types',()=>{expect(['job_seeker','mentor','employer'].map(registrationRole)).toEqual(['job_seeker','mentor','employer']);});
 it('restricts applications to job seekers',()=>{expect(canApply('employer','published','2027-02-20','2026-11-27')).toBe(false);expect(canApply('mentor','published','2027-02-20','2026-11-27')).toBe(false);expect(canApply('job_seeker','published','2027-02-20','2026-11-27')).toBe(true);});
 it('rejects closed or expired opportunities',()=>{expect(canApply('job_seeker','closed','2027-02-20','2026-11-27')).toBe(false);expect(canApply('job_seeker','published','2026-11-26','2026-11-27')).toBe(false);});
 it('matches normalized required skills',()=>{expect(skillsMatch(['python','SQL'],['Python','SQL','Excel'])).toBe(67);expect(skillsMatch([],['Python'])).toBe(0);});
 it('calculates profile completion from ten career fields',()=>{expect(profileCompletion({full_name:'Amina',headline:'Designer',location:'Nairobi',skills:['Figma']})).toBe(40);});
 it('supports every requested application status',()=>{expect(applicationStatuses).toEqual(['Submitted','Under Review','Shortlisted','Interview','Accepted','Rejected','Withdrawn']);});
});
