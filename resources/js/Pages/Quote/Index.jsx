import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import FormField from '@/Components/UI/FormField';
import FormStatus from '@/Components/UI/FormStatus';
import Section from '@/Components/UI/Section';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';

export default function Quote({ seo, pageContent, sections = [], services = [] }) {
    const highlightsSection = sections.find((section) => section.section_key === 'quote_highlights');
    const budgetSection = sections.find((section) => section.section_key === 'budget_options');
    const form = useForm({
        name: '',
        email: '',
        company: '',
        phone: '',
        service_id: '',
        budget: '',
        timeline: '',
        reference: '',
        brief: '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/quote', {
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
                <div className="mt-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
                    <Card className="space-y-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-white/40">What this page is ready for</p>
                        <ul className="space-y-3 text-base leading-7 text-white/65">
                            {(highlightsSection?.items ?? []).map((item) => (
                                <li key={item.title}>{item.title}</li>
                            ))}
                        </ul>
                    </Card>

                    <Card>
                        <form className="grid gap-5 md:grid-cols-2" onSubmit={submit}>
                            <FormField error={form.errors.name} label="Your Name" name="name" onChange={(e) => form.setData('name', e.target.value)} placeholder="Full name" value={form.data.name} />
                            <FormField
                                error={form.errors.email}
                                label="Business Email"
                                name="email"
                                onChange={(e) => form.setData('email', e.target.value)}
                                placeholder="you@company.com"
                                type="email"
                                value={form.data.email}
                            />
                            <FormField
                                error={form.errors.company}
                                label="Company Name"
                                name="company"
                                onChange={(e) => form.setData('company', e.target.value)}
                                placeholder="Company or brand"
                                value={form.data.company}
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
                                as="select"
                                error={form.errors.service_id}
                                label="Service Needed"
                                name="service_id"
                                onChange={(e) => form.setData('service_id', e.target.value)}
                                options={services.map((service) => ({ label: service.name, value: String(service.id) }))}
                                placeholder="Select a service"
                                value={form.data.service_id}
                            />
                            <FormField
                                as="select"
                                error={form.errors.budget}
                                label="Estimated Budget"
                                name="budget"
                                onChange={(e) => form.setData('budget', e.target.value)}
                                options={(budgetSection?.items ?? []).map((item) => item.title)}
                                placeholder="Select budget range"
                                value={form.data.budget}
                            />
                            <FormField
                                error={form.errors.timeline}
                                label="Expected Timeline"
                                name="timeline"
                                onChange={(e) => form.setData('timeline', e.target.value)}
                                placeholder="e.g. 2 weeks or 2 months"
                                value={form.data.timeline}
                            />
                            <FormField
                                error={form.errors.reference}
                                label="Website or Reference"
                                name="reference"
                                onChange={(e) => form.setData('reference', e.target.value)}
                                placeholder="Optional URL or reference note"
                                value={form.data.reference}
                            />
                            <div className="md:col-span-2">
                                <FormField
                                    as="textarea"
                                    error={form.errors.brief}
                                    label="Project Brief"
                                    name="brief"
                                    onChange={(e) => form.setData('brief', e.target.value)}
                                    placeholder="Tell us what you want to build, improve, or launch"
                                    rows={7}
                                    value={form.data.brief}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button className="px-7" disabled={form.processing} type="submit">
                                    {form.processing ? 'Submitting...' : pageContent.primary_cta_label || 'Request Quote'}
                                </Button>
                                <div className="mt-3">
                                    <FormStatus
                                        processing={form.processing}
                                        processingLabel="Submitting your request..."
                                        recentlySuccessful={form.recentlySuccessful}
                                        successLabel="Quote request submitted successfully."
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
