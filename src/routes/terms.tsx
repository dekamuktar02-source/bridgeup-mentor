import { createFileRoute } from '@tanstack/react-router';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/terms')({ head: () => pageHead('Terms of Service', 'Use BridgeUp respectfully and honestly. Opportunities are reviewed before they are published.'), component: Page });
function Page() { return <PublicShell><PageBanner eyebrow="BridgeUp" title="Terms of Service" description="Use BridgeUp respectfully and honestly. Opportunities are reviewed before they are published." /></PublicShell>; }
