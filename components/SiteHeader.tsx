import Link from "next/link";

const NAV_LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="rounded-md text-base font-semibold text-neutral-900"
        >
          AgencyCalc
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-1 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-2.5 py-1.5 font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}