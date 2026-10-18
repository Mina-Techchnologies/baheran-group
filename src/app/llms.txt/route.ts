import { BUSINESS_PAGES, BUSINESS_SLUGS } from "@/content/business-pages";
import { ABOUT, CONTACT, PRINCIPALS } from "@/content/company";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

/**
 * /llms.txt (https://llmstxt.org): a plain summary of the company with links to every page, for AI
 * assistants that read it instead of crawling the HTML. Built from the same content as the pages.
 */
const etb = (value: number) => `ETB ${value.toLocaleString("en-US")}`;

function body() {
  const businesses = BUSINESS_SLUGS.map((slug) => {
    const page = BUSINESS_PAGES[slug];
    return `- [${page.title}](${absoluteUrl(`/${slug}`)}): ${page.description}`;
  });

  return `# ${SITE_NAME}

> ${SITE_NAME} is a family-owned private limited company in Addis Ababa, Ethiopia, founded in October 2009. It exports Ethiopian sesame and pulses, imports heavy machinery and vehicles, runs a fleet of 80 cargo trucks, rents heavy construction equipment, makes Tsehay Paints and owns Eyor Tower on Churchill Road.

Key facts:

- Legal form: ${ABOUT.legalForm}
- Founded: October 2009, in Addis Ababa
- Paid-up capital: ${etb(ABOUT.capital.atFounding)} at founding, ${etb(ABOUT.capital.now)} today
${ABOUT.credentials.map((item) => `- ${item.term}: ${item.detail}`).join("\n")}
${PRINCIPALS.map((person) => `- ${person.role}: ${person.name}`).join("\n")}
- Head office: ${CONTACT.addressLines.join(", ")}
- Email: ${CONTACT.email}

## Businesses

${businesses.join("\n")}

## Company

- [Home](${absoluteUrl("/")}): all six businesses on one page, with key figures
- [About Baheran](${absoluteUrl("/#company")}): history, paid-up capital, licences and memberships
- [Leadership](${absoluteUrl("/#leadership")}): managing director, general manager, executive team and organisation chart
- [Contact](${absoluteUrl("/#contact")}): email and head office address
`;
}

export function GET() {
  return new Response(body(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
