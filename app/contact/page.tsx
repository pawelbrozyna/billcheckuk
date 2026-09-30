import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact | BillCheck UK",
  description:
    "Have a question, suggestion or found an issue? Send the BillCheck UK team a message.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Have a question, suggestion or found an issue? Send us a message.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
