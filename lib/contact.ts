export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact({
  name,
  email,
  message,
}: ContactInput): ContactErrors {
  const errors: ContactErrors = {};

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > CONTACT_LIMITS.name) {
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.message) {
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message} characters.`;
  }

  return errors;
}
