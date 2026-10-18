import { MessageCircleQuestionMark } from "lucide-react";

import { BUSINESS_PAGES, type BusinessSlug } from "@/content/business-pages";
import { CONTACT } from "@/content/company";
import { stagger } from "./motion";
import { Accent, Eyebrow } from "./SectionHeading";

/**
 * Plain questions and answers, all open. Search engines and AI assistants quote answers like these
 * directly, and the same text goes into the page's FAQPage structured data.
 */
export function BusinessFaq({ slug }: { slug: BusinessSlug }) {
  const { faqs } = BUSINESS_PAGES[slug];

  return (
    <section aria-labelledby="faq-title" className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div data-reveal className="lg:col-span-4">
        <Eyebrow icon={MessageCircleQuestionMark} label="Questions" />
        <h2 id="faq-title" className="display-lg mt-5 max-w-[12ch]">
          What people <Accent>ask us</Accent>
        </h2>
      </div>

      <div className="grid content-start gap-3 lg:col-span-8">
        {faqs.map((faq, i) => (
          <article key={faq.question} data-reveal style={stagger(i)} className="card p-5 sm:p-6">
            <h3 className="text-lg font-bold leading-snug tracking-[-0.01em]">{faq.question}</h3>
            <p className="mt-2 text-muted">
              <WithEmailLink text={faq.answer} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Turns the company email address in an answer into a mail link. */
function WithEmailLink({ text }: { text: string }) {
  const [before, after] = text.split(CONTACT.email);
  if (after === undefined) return text;
  return (
    <>
      {before}
      <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary-dark underline underline-offset-4">
        {CONTACT.email}
      </a>
      {after}
    </>
  );
}
