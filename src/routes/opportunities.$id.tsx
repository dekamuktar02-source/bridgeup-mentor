import { createFileRoute, notFound } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { Skills } from '@/components/bridgeup/cards';
import { catalogOptions } from '@/lib/career-queries';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/opportunities/$id')({ head: () => pageHead('Opportunity','Opportunity details on BridgeUp.'), loader: async ({context,params}) => { const d=await context.queryClient.ensureQueryData(catalogOptions); if(!d.opportunities.some(o=>o.id===params.id)) throw notFound(); }, component: Page });
function Page(){ const {id}=Route.useParams(); const {data}=useSuspenseQuery(catalogOptions); const o=data.opportunities.find(x=>x.id===id)!; return <PublicShell><PageBanner eyebrow={o.type} title={o.title} description={`${o.organisation} · ${o.location} · ${o.arrangement}`}/><section className="section container-wide"><p>{o.description}</p><Skills skills={o.skills}/><p>{o.salary} · Closes {o.deadline}</p>{o.sample&&<p className="sample-label">Sample opportunity</p>}</section></PublicShell>; }
