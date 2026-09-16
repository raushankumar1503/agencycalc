import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-neutral-600 hover:text-neutral-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-4 text-xs text-neutral-500">
          © {year} {SITE_NAME}. Planning tools and guides for freelance web
          developers and small agencies.
        </p>
      </div>
    </footer>
  );
}