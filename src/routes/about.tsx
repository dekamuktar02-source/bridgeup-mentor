import { createFileRoute } from '@tanstack/react-router';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/about')({ head: () => pageHead('About BridgeUp', 'BridgeUp helps talented people bridge the local experience gap through mentorship and skills-based hiring.'), component: Page });
function Page() { return <PublicShell><PageBanner eyebrow="BridgeUp" title="About BridgeUp" description="BridgeUp helps talented people bridge the local experience gap through mentorship and skills-based hiring." /></PublicShell>; }
