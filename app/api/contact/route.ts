import nodemailer from "nodemailer";
import { validateContact, type ContactInput } from "@/lib/contact";

function getSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    return null;
  }

  const port = Number(SMTP_PORT);
  return {
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    from: SMTP_USER,
    to: CONTACT_TO_EMAIL,
  };
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this field, so pretend success for bots.
  if (asString(body.website)) {
    return Response.json({ ok: true });
  }

  const input: ContactInput = {
    name: asString(body.name),
    email: asString(body.email),
    message: asString(body.message),
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return Response.json(
      { error: "Please check the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const smtp = getSmtpConfig();
  if (!smtp) {
    console.error("Contact form: SMTP environment variables are not configured.");
    const error =
      process.env.NODE_ENV === "development"
        ? "Email is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL to .env.local."
        : "Sorry, the contact form is temporarily unavailable. Please try again later.";
    return Response.json({ error }, { status: 503 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.auth,
    });

    await transporter.sendMail({
      from: `"BillCheck UK" <${smtp.from}>`,
      to: smtp.to,
      replyTo: { name: input.name, address: input.email },
      subject: `BillCheck UK contact: ${input.name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return Response.json(
      { error: "Sorry, your message could not be sent. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
