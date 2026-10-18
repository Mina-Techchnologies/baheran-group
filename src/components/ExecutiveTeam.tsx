import { BriefcaseBusiness, GraduationCap } from "lucide-react";

import { EXECUTIVES, type Executive } from "@/content/company";
import { CountUp } from "./CountUp";

const initials = (name: string) =>
  name
    .replace(/^(Ato|W\/ro)\s+/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

/**
 * Executive team as an "experience board": a summary panel beside one row per manager, with years
 * of experience drawn as bars on a shared scale so the team's depth reads at a glance.
 */
export function ExecutiveTeam() {
  const totalYears = EXECUTIVES.reduce((sum, person) => sum + (person.experience?.years ?? 0), 0);
  const maxYears = Math.max(...EXECUTIVES.map((person) => person.experience?.years ?? 0));
  const shareholders = EXECUTIVES.filter((person) => person.shareholder).length;

  return (
    <div className="mt-24 grid gap-4 lg:grid-cols-12 lg:gap-5">
      <aside
        aria-labelledby="executive-team-title"
        data-reveal
        // sticky: the summary stays in view while the list beside it scrolls past
        className="on-dark glow-dark rounded-card p-7 text-white shadow-float sm:p-8 lg:sticky lg:top-28 lg:col-span-4 lg:self-start"
      >
        <h3 id="executive-team-title" className="display-md">
          Executive management team
        </h3>
        <p className="mt-10 text-7xl font-extrabold leading-none tracking-tighter">
          <CountUp value={String(totalYears)} />
        </p>
        <p className="mt-3 max-w-[18rem] font-semibold leading-snug">
          years of combined experience in business, banking and accounting
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/12 pt-6">
          <div>
            <dt className="text-sm text-subtle">Managers</dt>
            <dd className="mt-1 text-2xl font-extrabold">{EXECUTIVES.length}</dd>
          </div>
          <div>
            <dt className="text-sm text-subtle">Also shareholders</dt>
            <dd className="mt-1 text-2xl font-extrabold">{shareholders}</dd>
          </div>
        </dl>
      </aside>

      <div data-reveal className="card overflow-hidden [--i:1] lg:col-span-8">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[15rem_minmax(0,1fr)_12rem] gap-6 border-b border-line bg-surface-2 px-6 py-3 text-sm font-semibold text-muted md:grid"
        >
          <span>Manager</span>
          <span>Years of experience</span>
          <span>Education</span>
        </div>
        <ul className="divide-y divide-line">
          {EXECUTIVES.map((person) => (
            <ExecutiveRow key={person.name} person={person} maxYears={maxYears} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExecutiveRow({ person, maxYears }: { person: Executive; maxYears: number }) {
  const { experience } = person;

  return (
    <li className="grid gap-4 p-5 md:grid-cols-[15rem_minmax(0,1fr)_12rem] md:items-center md:gap-6 md:px-6">
      <div className="flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 font-bold text-primary-dark"
        >
          {initials(person.name)}
        </span>
        <div className="min-w-0">
          <p className="font-bold leading-tight">{person.name}</p>
          <p className="mt-0.5 text-sm font-semibold leading-snug text-primary-dark">{person.position}</p>
          {person.shareholder && (
            <span className="mt-1.5 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
              Shareholder
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3 md:block">
        <BriefcaseBusiness aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary md:hidden" strokeWidth={1.75} />
        <div className="min-w-0 flex-1">
          <span className="sr-only">Experience: </span>
          {experience ? (
            <>
              <p className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold leading-none tracking-[-0.02em]">{experience.years}</span>
                <span className="text-sm font-semibold text-muted">years</span>
              </p>
              {/* Shared scale across all rows; only the data end is rounded. */}
              <div
                aria-hidden="true"
                title={`${person.name}: ${experience.years} years`}
                className="mt-2 h-2 rounded-r-sm bg-primary/12"
              >
                <div
                  data-reveal="grow"
                  className="h-full rounded-r-sm bg-primary"
                  style={{ width: `${(experience.years / maxYears) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-sm leading-snug text-muted">{experience.detail}</p>
            </>
          ) : (
            <p className="text-sm text-muted">Experience not listed</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 text-[0.9375rem] leading-snug">
        <GraduationCap aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} />
        <div>
          <span className="sr-only">Education: </span>
          {person.education.length > 0 ? (
            person.education.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
          ) : (
            <span className="text-muted">Not listed</span>
          )}
        </div>
      </div>
    </li>
  );
}
