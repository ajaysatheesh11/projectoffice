import Container from '@/Components/UI/Container';
import Button from '@/Components/UI/Button';
import { companyProfile } from '@/data/siteContent';

export default function Footer() {
    return (
        <footer className="border-t border-lime-200/10 bg-black/20 text-white">
            <Container className="flex flex-col gap-8 py-8 text-sm md:flex-row md:items-end md:justify-between">
                <div className="fade-slide-in">
                    <img src="/images/image.png" alt="Auxio Logo" className="mb-4 h-8 w-auto opacity-80" decoding="async" height="32" loading="lazy" width="112" />
                    <p className="font-medium text-white">{companyProfile.name}</p>
                    <p className="mt-1 max-w-xl text-white/45">{companyProfile.taglines.secondary}</p>
                </div>
                <div className="flex flex-col gap-3 md:items-end">
                    <Button as="a" href="/quote" className="px-5 py-2.5">
                        Get a Quote
                    </Button>
                    <p className="text-white/55">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}
