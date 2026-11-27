import { createFileRoute, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { Skills } from '@/components/bridgeup/cards';
import { catalogOptions } from '@/lib/career-queries';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/mentors/$id')({ head: () => pageHead('Mentor','Mentor profile on BridgeUp.'), loader: async ({context,params}) => { const d=await context.queryClient.ensureQueryData(catalogOptions); if(!d.mentors.some(m=>m.id===params.id)) throw notFound(); }, component: Page });
function Page(){ const {id}=Route.useParams(); const {data}=useSuspenseQuery(catalogOptions); const m=data.mentors.find(x=>x.id===id)!; return <PublicShell><PageBanner eyebrow="Mentor" title={m.name} description={`${m.title} · ${m.organisation}`}/><section className="section container-wide"><p>{m.biography}</p><Skills skills={m.expertise}/>{m.sample&&<p className="sample-label">Sample mentor profile</p>}</section></PublicShell>; }
