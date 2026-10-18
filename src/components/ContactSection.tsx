"use client";

import { ArrowRight, Mail, MapPin, MessageSquareText, Phone, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { CONTACT, CONTACT_TOPICS, mailto } from "@/content/company";
import { Accent, Eyebrow } from "./SectionHeading";

/** `topic` picks the enquiry selected at first: a business page starts on its own business. */
export function ContactSection({ topic: initialTopic = CONTACT_TOPICS[0].id }: { topic?: string }) {
  const [topicId, setTopicId] = useState(initialTopic);
  const topic = CONTACT_TOPICS.find((item) => item.id === topicId) ?? CONTACT_TOPICS[0];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-surface-2">
      <div className="wrap">
        <div data-reveal className="flex flex-col items-center text-center">
          <Eyebrow icon={MessageSquareText} label="Get in touch" />
          <h2 id="contact-title" className="display-lg mt-5">
            Tell us <Accent>what you need</Accent>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <dl data-reveal className="on-dark glow-dark rounded-card p-6 text-white shadow-float sm:p-8 lg:col-span-5">
            <ContactRow icon={Phone} term="Phone">
              <a href={CONTACT.phoneHref} className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
                {CONTACT.phone}
              </a>
            </ContactRow>
            <ContactRow icon={Mail} term="Email">
              <a href={`mailto:${CONTACT.email}`} className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
                {CONTACT.email}
              </a>
            </ContactRow>
            <ContactRow icon={MapPin} term="Office">
              <address className="not-italic">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactRow>
          </dl>

          <div data-reveal className="card p-6 [--i:1] sm:p-8 lg:col-span-7">
            <fieldset>
              <legend className="font-semibold">What is your enquiry about?</legend>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {CONTACT_TOPICS.map((item) => (
                  <label key={item.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="topic"
                      value={item.id}
                      checked={item.id === topicId}
                      onChange={() => setTopicId(item.id)}
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 py-1.5 text-[0.9375rem] font-semibold transition-colors hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary peer-focus-visible:outline-solid">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
              <a
                href={mailto(topic.subject)}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-white shadow-float transition hover:bg-accent-dark active:scale-[0.98]"
              >
                Start an email
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
              <p aria-live="polite" className="text-[0.9375rem] text-muted">
                Opens your email app with the subject &ldquo;{topic.subject}&rdquo;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, term, children }: { icon: LucideIcon; term: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-white/12 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-primary-light">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <dt className="eyebrow text-primary-light">{term}</dt>
        <dd className="mt-1">{children}</dd>
      </div>
    </div>
  );
}
