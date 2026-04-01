import { FaqAccordion } from "@/components/site/faq-accordion";
import { JsonLd } from "@/components/site/schema";
import { SectionHeading } from "@/components/site/section-heading";
import { getFaqs } from "@/lib/cms";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers about booking timelines, travel areas, custom packages, setup, deposits, venues, and what happens after you inquire.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Practical answers for a smoother booking experience."
          description="If you do not see your question here, our inquiry form is the best place to share the details and we will guide you from there."
          align="center"
        />
        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </div>
  );
}
