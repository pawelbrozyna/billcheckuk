import Link from "next/link";
import { mainNav } from "@/lib/site";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

export function Header() {
  return (
    <header className="relative z-50 border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="BillCheck UK home" className="rounded-sm">
          <Wordmark />
        </Link>
        <DesktopNav links={mainNav} />
        <MobileMenu links={mainNav} />
      </Container>
    </header>
  );
}
