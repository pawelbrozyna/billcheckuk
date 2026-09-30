import Link from "next/link";
import { AnalyticsPreference } from "@/components/AnalyticsPreference";
import { ContentPage } from "@/components/ContentPage";
import { ANALYTICS_OPT_OUT_KEY } from "@/lib/analytics";
import { pageMetadata } from "@/lib/metadata";
import { OWNER_COOKIE } from "@/lib/owner";

export const metadata = pageMetadata({
  title: "Privacy & Cookies | BillCheck UK",
  description:
    "Information about privacy, cookies, analytics and how BillCheck UK handles data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy & Cookies"
      intro="BillCheckUK provides simple tools for UK households, such as a broadband speed test, and, as the service develops, ways to compare household services like energy and broadband. This page explains what information we handle, which cookies and browser storage we use, and the choices you have."
    >
      <p>Last updated: 30 September 2026</p>

      <h2>Privacy</h2>
      <p>
        We try to collect as little information as possible. We do not sell personal information,
        we do not use it for marketing, and we don&apos;t use cookies just because most websites
        do.
      </p>

      <h2>Information you provide</h2>
      <p>
        You do not need an account to use BillCheckUK. The only information you give us directly
        is what you send through the contact form. Postcodes entered on our Energy and Broadband
        pages are not stored.
      </p>

      <h2>Contact form</h2>
      <p>
        When you use our <Link href="/contact">contact form</Link>, we receive your name, your
        email address, your message and anything else you choose to include in it.
      </p>
      <p>
        We use this only to reply to your enquiry and to run and support the service. We rely on
        our legitimate interest in responding to people who contact us.
      </p>

      <h2>Analytics</h2>
      <p>
        When it is configured, we use Google Analytics 4 to understand how people use the website
        in general so that we can improve it. This may include:
      </p>
      <ul>
        <li>which pages are visited</li>
        <li>approximate device, browser and screen information</li>
        <li>general interaction with the site, such as clicks and scrolling</li>
        <li>how visitors arrived, for example from a search engine or another website</li>
        <li>approximate location, such as country or region</li>
        <li>overall usage patterns, which we view as aggregated reports</li>
      </ul>
      <p>
        Google uses your IP address to estimate a general location; Google says that Google
        Analytics 4 does not log or store IP addresses. We do not describe this data as anonymous,
        because it can relate to an individual browser. Google processes it on our behalf. You can
        read more in{" "}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
          how Google uses information from sites that use its services
        </a>
        .
      </p>
      <p>
        Under current UK rules (the Privacy and Electronic Communications Regulations, as amended
        by the Data (Use and Access) Act 2025), cookies and similar technologies used only to
        collect statistics about how a website is used, so that it can be improved, can be used
        without asking for consent first, as long as certain conditions are met. Those conditions
        include giving people clear information and a simple, free way to object. This is why we
        don&apos;t show a cookie banner for analytics.
      </p>
      <p>
        We intend to use analytics only on this basis: for statistical measurement and
        improvement of our own website. That means:
      </p>
      <ul>
        <li>we do not use our analytics for advertising</li>
        <li>we do not use it to track you across other websites</li>
        <li>we do not use it to build advertising profiles</li>
        <li>
          advertising features are switched off in our setup, including Google Signals and ad
          personalisation
        </li>
        <li>you can opt out at any time using the control below</li>
      </ul>
      <p>
        Not every way of using Google Analytics would qualify for this exception. If we ever
        change how we use analytics in a way that requires consent, we will ask for it first. Our
        lawful basis under data protection law is our legitimate interest in understanding and
        improving the website.
      </p>

      <h2 id="analytics-opt-out">Analytics opt-out</h2>
      <p>
        You can opt out of BillCheckUK analytics, or turn it back on, here. Your choice is saved
        in this browser only, so Google Analytics will not load on future visits, and any Google
        Analytics cookies already set are removed. The preference is not sent to Google. If you
        use several browsers or devices, you will need to opt out on each one.
      </p>
      <AnalyticsPreference />

      <h2>Cookies and browser storage</h2>
      <p>
        Cookies are small text files that a website saves in your browser. UK rules also cover
        similar technologies that store or read information on your device, such as your
        browser&apos;s local storage. This is everything BillCheckUK uses:
      </p>
      <ul>
        <li>
          <strong>
            <code>_ga</code> and <code>_ga_&lt;ID&gt;</code>
          </strong>{" "}
          (Google Analytics cookies, first-party): set only when analytics loads. <code>_ga</code>{" "}
          distinguishes one browser from another and <code>_ga_&lt;ID&gt;</code> keeps track of
          the current visit. By default they last up to 2 years.
        </li>
        <li>
          <strong>
            <code>{ANALYTICS_OPT_OUT_KEY}</code>
          </strong>{" "}
          (local storage): saved only if you opt out of analytics, so we can respect your choice.
          It stays in your browser and is not sent to us or to Google.
        </li>
        <li>
          <strong>
            <code>{OWNER_COOKIE}</code>
          </strong>{" "}
          (owner mode cookie): see below.
        </li>
      </ul>
      <p>
        <strong>Owner mode.</strong> The site owner can turn on a first-party preference in their
        own browser so that their own visits are not counted in analytics. It is a functional
        setting, it is not used for advertising, and it stops analytics from loading in that
        browser. It lasts up to a year, can be removed at any time, and is not set for regular
        visitors.
      </p>
      <p>
        The opt-out and owner mode preferences are not used for advertising. You can also block or
        delete cookies in your browser settings; this will not stop the site from working. Clearing
        your browser&apos;s local storage also clears your analytics opt-out, so you would need to
        opt out again.
      </p>

      <h2>Broadband Speed Test and Cloudflare</h2>
      <p>
        Our <Link href="/broadband/speed-test">broadband speed test</Link> uses Cloudflare&apos;s
        speed-testing technology and infrastructure.
      </p>
      <ul>
        <li>
          The test does not start automatically. It only starts when you choose &ldquo;Start speed
          test&rdquo;.
        </li>
        <li>
          Your browser then sends and receives test data directly to and from Cloudflare&apos;s
          servers to take the measurement. This traffic does not pass through BillCheckUK&apos;s
          servers.
        </li>
        <li>
          The measurements include download speed, upload speed, latency (response time) and
          jitter (how much latency varies).
        </li>
        <li>
          The results are shown in your browser only. We do not currently store them in a
          database, save them in cookies or local storage, or send them to BillCheckUK.
        </li>
        <li>
          The test requests are made without sending or accepting cookies, and nothing is saved on
          your device.
        </li>
        <li>
          We have turned off the Cloudflare feature that sends test results to Cloudflare&apos;s
          own results logging.
        </li>
      </ul>
      <p>
        To carry out the test, Cloudflare will process technical and network information, such as
        your IP address and the requests your browser makes. Cloudflare&apos;s handling of this
        information is covered by its own{" "}
        <a href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer">
          privacy policy
        </a>
        .
      </p>

      <h2>Affiliate and comparison services</h2>
      <p>
        We plan to introduce energy and broadband comparison services. We do not currently work
        with a comparison partner, and we do not use any affiliate, advertising or
        conversion-tracking cookies.
      </p>
      <ul>
        <li>In future, some comparison links or services may be provided by third-party partners.</li>
        <li>
          We may receive a commission when you complete a qualifying purchase or switch through one
          of those links.
        </li>
        <li>
          This should not increase the price you pay, unless a future arrangement says otherwise,
          in which case we will tell you.
        </li>
        <li>We will name the relevant partners when those services are introduced.</li>
      </ul>
      <p>
        Affiliate and advertising tracking is separate from statistical analytics and is not
        covered by the statistical exception. If we introduce affiliate, advertising or
        conversion-tracking technologies that require consent under UK law, they will not be
        switched on until you have given that consent.
      </p>

      <h2>Third-party services</h2>
      <p>We use these providers to run the website:</p>
      <ul>
        <li>
          <strong>Vercel</strong>: hosts the website. Like other hosting providers, it processes
          technical information such as IP addresses and request logs to deliver the site and keep
          it secure. See{" "}
          <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer">
            Vercel&apos;s privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Cloudflare</strong>: provides the broadband speed-test infrastructure, only when
          you start a test.
        </li>
        <li>
          <strong>Google Analytics</strong>: provides website statistics when configured, unless
          you opt out. See{" "}
          <a href="https://policies.google.com/privacy" rel="noopener noreferrer">
            Google&apos;s privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Our email provider</strong>: delivers messages sent through the contact form to
          us.
        </li>
      </ul>
      <p>
        Some of these providers may process information outside the UK. Where that happens, we
        rely on the safeguards they provide under UK data protection law.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep personal information only for as long as reasonably necessary for the purpose it
        was collected for, such as dealing with your enquiry. Analytics data is kept in line with
        the retention settings of our Google Analytics account.
      </p>

      <h2>Your rights</h2>
      <p>
        Under UK data protection law you have rights over your personal information. They depend
        on the circumstances and are not absolute, but they may include the right to:
      </p>
      <ul>
        <li>ask for a copy of the information we hold about you</li>
        <li>ask us to correct information that is wrong</li>
        <li>ask us to delete your information</li>
        <li>ask us to restrict how we use it</li>
        <li>object to how we use it, including for analytics</li>
        <li>receive your information in a portable format, where this applies</li>
      </ul>
      <p>
        If you are unhappy with how we have handled your information, you can complain to the{" "}
        <a href="https://ico.org.uk/" rel="noopener noreferrer">
          Information Commissioner&apos;s Office (ICO)
        </a>
        , the UK&apos;s data protection regulator. We would appreciate the chance to help first.
      </p>

      <h2>Contact</h2>
      <p>
        If you have a question about privacy or want to use your rights, please send us a message
        using our <Link href="/contact">contact form</Link>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this page as BillCheckUK adds or changes services, for example when new
        comparison services are introduced. The date at the top of this page shows when it was
        last updated.
      </p>
    </ContentPage>
  );
}
