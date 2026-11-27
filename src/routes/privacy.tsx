import { createFileRoute } from '@tanstack/react-router';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/privacy')({ head: () => pageHead('Privacy Policy', 'You control which profile details employers can see. Your CV stays private unless you share it.'), component: Page });
function Page() { return <PublicShell><PageBanner eyebrow="BridgeUp" title="Privacy Policy" description="You control which profile details employers can see. Your CV stays private unless you share it." /></PublicShell>; }
