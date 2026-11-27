import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { MentorCard } from '@/components/bridgeup/cards';
import { catalogOptions } from '@/lib/career-queries';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/mentors/')({ head: () => pageHead('Browse Mentors','Experienced professionals ready to guide your next career step.'), loader: ({context}) => context.queryClient.ensureQueryData(catalogOptions), component: Page });
function Page(){ const {data}=useSuspenseQuery(catalogOptions); return <PublicShell><PageBanner eyebrow="Mentors" title="Find a Mentor" description="Get guidance from professionals who have been there."/><section className="section container-wide"><div className="cards-grid">{data.mentors.map(m=><MentorCard key={m.id} mentor={m}/>)}</div></section></PublicShell>; }
