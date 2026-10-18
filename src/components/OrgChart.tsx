import { ORG } from "@/content/company";

export function OrgChart() {
  return (
    <div data-reveal className="mt-24">
      <h3 className="display-md">Organisation structure</h3>

      {/* Drawn diagram for wider screens. The nested list below carries the same structure for
          screen readers and is what phones see. */}
      <div aria-hidden="true" className="mt-8 hidden rounded-card bg-surface-2 p-8 md:block lg:p-12">
        <div className="org">
          <span />
          <Lead>{ORG.top}</Lead>
          <span />

          <div className="org-arm org-arm--left">
            <Staff>{ORG.topStaff}</Staff>
          </div>
          <div className="org-spine org-spine--left min-h-20" />
          <span />

          <span />
          <Lead>{ORG.second}</Lead>
          <span />

          <div className="org-arm org-arm--left">
            <Staff>{ORG.secondStaffLeft}</Staff>
          </div>
          <div className="org-spine org-spine--both min-h-24" />
          <div className="org-arm org-arm--right">
            <Staff>{ORG.secondStaffRight}</Staff>
          </div>

          <span />
          <div className="org-spine h-6" />
          <span />
        </div>
        <ul className="org-departments">
          {ORG.departments.map((name) => (
            <li key={name}>
              <span className="card flex min-h-20 items-center justify-center px-4 py-3 text-center text-[0.9375rem] font-semibold leading-snug">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-8 md:sr-only">
        <li>
          <TreeLabel lead>{ORG.top}</TreeLabel>
          <ul className="ml-3 border-l border-subtle pl-5">
            <li className="mt-3">
              <TreeLabel>{ORG.topStaff}</TreeLabel>
            </li>
            <li className="mt-3">
              <TreeLabel lead>{ORG.second}</TreeLabel>
              <ul className="ml-3 border-l border-subtle pl-5">
                {[ORG.secondStaffLeft, ORG.secondStaffRight, ...ORG.departments].map((name) => (
                  <li key={name} className="mt-3">
                    <TreeLabel>{name}</TreeLabel>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <span className="glow-dark flex h-16 items-center justify-center rounded-2xl px-4 text-center text-lg font-bold text-white shadow-float">
      {children}
    </span>
  );
}

function Staff({ children }: { children: React.ReactNode }) {
  return (
    <span className="max-w-68 rounded-xl border border-dashed border-primary/50 bg-surface px-4 py-2.5 text-center text-[0.875rem] font-semibold leading-snug">
      {children}
    </span>
  );
}

function TreeLabel({ lead = false, children }: { lead?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        lead
          ? "inline-block rounded-xl bg-ink px-3 py-1.5 font-bold text-white"
          : "inline-block py-0.5 font-semibold"
      }
    >
      {children}
    </span>
  );
}
