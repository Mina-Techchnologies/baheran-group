import { Users } from "lucide-react";

import { PRINCIPALS } from "@/content/company";
import { ExecutiveTeam } from "./ExecutiveTeam";
import { stagger } from "./motion";
import { OrgChart } from "./OrgChart";
import { Accent, SectionHeading } from "./SectionHeading";

export function LeadershipSection() {
  return (
    <section id="leadership" aria-labelledby="leadership-title" className="section-pad soft-glow">
      <div className="wrap">
        <SectionHeading
          id="leadership-title"
          eyebrow={{ icon: Users, label: "Leadership" }}
          title={
            <>
              The people who <Accent>run Baheran</Accent>
            </>
          }
          lede="Three shareholders lead the company. Finance and administration, operations and logistics, and the technical departments each have their own experienced manager."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {PRINCIPALS.map((person, i) => (
            <li key={person.name} data-reveal style={stagger(i)} className="card lift p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold leading-tight tracking-[-0.02em]">{person.name}</h3>
              <p className="mt-2 font-semibold text-primary-dark">{person.role}</p>
              <p className="mt-5 text-muted">{person.bio}</p>
            </li>
          ))}
        </ul>

        <ExecutiveTeam />

        <OrgChart />
      </div>
    </section>
  );
}
