import { createFileRoute } from '@tanstack/react-router';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/contact')({ head: () => pageHead('Contact Us', 'Reach the BridgeUp team at hello@bridgeup.example for partnerships and support.'), component: Page });
function Page() { return <PublicShell><PageBanner eyebrow="BridgeUp" title="Contact Us" description="Reach the BridgeUp team at hello@bridgeup.example for partnerships and support." /></PublicShell>; }
