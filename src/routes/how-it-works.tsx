import { createFileRoute } from '@tanstack/react-router';
import { PublicShell, PageBanner } from '@/components/bridgeup/public-shell';
import { pageHead } from '@/lib/metadata';
export const Route = createFileRoute('/how-it-works')({ head: () => pageHead('How It Works', 'Build your profile, connect with mentors, gain experience, and get matched with employers who value skills.'), component: Page });
function Page() { return <PublicShell><PageBanner eyebrow="BridgeUp" title="How It Works" description="Build your profile, connect with mentors, gain experience, and get matched with employers who value skills." /></PublicShell>; }
