import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import FormField from '@/Components/UI/FormField';
import FormStatus from '@/Components/UI/FormStatus';
import Section from '@/Components/UI/Section';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';

export default function Contact({ seo, pageContent, sections = [] }) {
    const contactDetailsSection = sections.find((section) => section.section_key === 'contact_details');
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/contact', {
            onSuccess: () => form.reset(),
        });
    };

    return (
        <AppLayout>
            <SEO title={seo.title} description={seo.description} />

            <Section
                className="py-20"
                containerClassName="space-y-8"
                description={pageContent.description}
                eyebrow={pageContent.eyebrow}
                title={pageContent.title}
            >
                <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <Card className="space-y-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-white/40">Reach us</p>
                        {(contactDetailsSection?.items ?? []).map((item) => (
                            <div key={item.label} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                                <p className="text-sm text-white/40">{item.label}</p>
                                <p className="mt-2 text-lg text-white/80">{item.value}</p>
                            </div>
                        ))}
                    </Card>

                    <Card>
                        <form className="grid gap-5 md:grid-cols-2" onSubmit={submit}>
                            <FormField
                                error={form.errors.name}
                                label="Full Name"
                                name="name"
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="Your full name"
                                value={form.data.name}
                            />
                            <FormField
                                error={form.errors.email}
                                label="Email Address"
                                name="email"
                                onChange={(e) => form.setData('email', e.target.value)}
                                placeholder="you@example.com"
                                type="email"
                                value={form.data.email}
                            />
                            <FormField
                                error={form.errors.phone}
                                label="Phone Number"
                                name="phone"
                                onChange={(e) => form.setData('phone', e.target.value)}
                                placeholder="Optional phone number"
                                value={form.data.phone}
                            />
                            <FormField
                                error={form.errors.subject}
                                label="Subject"
                                name="subject"
                                onChange={(e) => form.setData('subject', e.target.value)}
                                placeholder="What would you like to discuss?"
                                value={form.data.subject}
                            />
                            <div className="md:col-span-2">
                                <FormField
                                    as="textarea"
                                    error={form.errors.message}
                                    label="Message"
                                    name="message"
                                    onChange={(e) => form.setData('message', e.target.value)}
                                    placeholder="Tell us a little about your project or requirement"
                                    rows={6}
                                    value={form.data.message}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button className="px-7" disabled={form.processing} type="submit">
                                    {form.processing ? 'Sending...' : pageContent.primary_cta_label || 'Send Inquiry'}
                                </Button>
                                <div className="mt-3">
                                    <FormStatus
                                        processing={form.processing}
                                        processingLabel="Sending your message..."
                                        recentlySuccessful={form.recentlySuccessful}
                                        successLabel="Message sent successfully."
                                    />
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </Section>
        </AppLayout>
    );
}
