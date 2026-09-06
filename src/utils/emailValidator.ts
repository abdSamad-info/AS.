/**
 * Client-side email validation utility.
 * Mirrors server-side validation to catch dummy, placeholder,
 * and disposable email domains instantly for a smooth user experience.
 */

const UNWANTED_DUMMY_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "example.edu",
  "test.com",
  "testing.com",
  "sample.com",
  "invalid.com",
  "invalid",
  "localhost",
  "abc.com",
  "xyz.com",
  "etc.com",
  "asdf.com",
  "fake.com",
  "fakemail.com",
  "qwerty.com",
  "dummy.com",
  "foo.com",
  "bar.com",
  "baz.com",
  "domain.com",
  "email.com",
  "myemail.com",
  "somedomain.com",
  "nomail.com",
  "noemail.com",
  "none.com",
  "user.com",
  "testemail.com",
]);

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "sharklasers.com",
  "throwawaymail.com",
  "dispostable.com",
  "yopmail.com",
  "trashmail.com",
  "mohmal.com",
  "dropmail.me",
  "fakemailgenerator.com",
  "inboxbear.com",
  "burnermail.io",
]);

export function validateClientEmail(email: string): { isValid: boolean; error?: string } {
  const clean = email.trim().toLowerCase();
  if (!clean) {
    return { isValid: false, error: "Please enter your email address." };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean)) {
    return { isValid: false, error: "Please enter a valid email format (e.g. name@domain.com)." };
  }

  const parts = clean.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  const [localPart, domain] = parts;

  if (UNWANTED_DUMMY_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: `The email domain "${domain}" is a placeholder or test domain. Please enter your real email address.`,
    };
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Temporary or disposable email addresses are not accepted. Please use a verified personal or business email.",
    };
  }

  for (const disposable of DISPOSABLE_EMAIL_DOMAINS) {
    if (domain.endsWith("." + disposable)) {
      return {
        isValid: false,
        error: "Disposable email addresses are not accepted. Please use a verified email.",
      };
    }
  }

  if (["test", "testing", "asdf", "fake", "dummy", "nobody"].includes(localPart) && domain.length <= 8) {
    return {
      isValid: false,
      error: "Please provide a real email address so Abdul Samad can reach you back.",
    };
  }

  return { isValid: true };
}
