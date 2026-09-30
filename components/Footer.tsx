import Link from "next/link";
import { mainNav, privacyLink } from "@/lib/site";
import { Container } from "./Container";
import { Wordmark } from "./Wordmark";

const linkClass =
  "rounded-sm text-sm text-muted transition-colors hover:text-navy active:text-navy";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" aria-label="BillCheck UK home" className="self-start rounded-sm">
            <Wordmark className="text-lg" />
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-5 flex flex-col gap-3 md:mt-6 md:flex-row-reverse md:items-center md:justify-between">
          <Link href={privacyLink.href} className={`${linkClass} self-start md:self-auto`}>
            {privacyLink.label}
          </Link>
          <p className="text-sm text-muted">&copy; 2026 BillCheck UK</p>
        </div>
      </Container>
    </footer>
  );
}
