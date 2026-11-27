import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { OpportunityCard } from '@/components/bridgeup/cards';
import { catalogOptions } from '@/lib/career-queries';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/opportunities/')({ head: () => pageHead('Browse Opportunities','Internships, fellowships, returnships, and entry-level roles that value skills.'), loader: ({context}) => context.queryClient.ensureQueryData(catalogOptions), component: Page });
function Page(){ const {data}=useSuspenseQuery(catalogOptions); return <PublicShell><PageBanner eyebrow="Opportunities" title="Browse Opportunities" description="Find structured work experience and entry-level roles."/><section className="section container-wide"><div className="cards-grid">{data.opportunities.map((o,i)=><OpportunityCard key={o.id} opportunity={o} index={i}/>)}</div></section></PublicShell>; }
