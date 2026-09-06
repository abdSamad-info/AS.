/**
 * Email validation and sanitization utility for Abdul Samad's Portfolio.
 * Blocks unwanted, placeholder, dummy, and disposable email domains
 * to ensure only legitimate inquiries are processed and forwarded via Resend.
 */

// Known placeholder / dummy / test domains frequently used in spam or test scripts
const UNWANTED_DUMMY_DOMAINS = new Set([
  // Example & RFC test domains
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
  // Common throwaway dummy domains
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
  "sampleemail.com",
]);

// Known disposable / burner temporary email services
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "temp-mail.io",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamailblock.com",
  "sharklasers.com",
  "grr.la",
  "throwawaymail.com",
  "dispostable.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "trashmail.com",
  "trashmail.net",
  "trashmail.me",
  "getairmail.com",
  "mohmal.com",
  "crazymailing.com",
  "dropmail.me",
  "fakemailgenerator.com",
  "nada.ltd",
  "getnada.com",
  "generator.email",
  "inboxbear.com",
  "burnermail.io",
  "maildrop.cc",
  "tempail.com",
  "minuteinbox.com",
  "mytemp.email",
  "tempr.email",
  "discard.email",
  "armyspy.com",
  "cuvox.de",
  "dayrep.com",
  "fleckens.hu",
  "gustr.com",
  "jourrapide.com",
  "rhyta.com",
  "superrito.com",
  "teleworm.us",
  "tinemail.com",
]);

// Suspicious local-part usernames that indicate fake/automated test entries
const SUSPICIOUS_LOCAL_PARTS = new Set([
  "test",
  "testing",
  "asdf",
  "qwerty",
  "dummy",
  "fake",
  "nobody",
  "null",
  "none",
  "abc",
  "xyz",
  "sample",
  "spam",
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  cleanEmail?: string;
  domain?: string;
  isUnwanted?: boolean;
}

/**
 * Validates whether an email address is syntactically sound and comes
 * from a legitimate domain (not a dummy, disposable, or unwanted test domain).
 */
export function validateInquiryEmail(rawEmail: unknown): EmailValidationResult {
  if (typeof rawEmail !== "string") {
    return { isValid: false, error: "Email address is required." };
  }

  const clean = rawEmail.trim().toLowerCase();

  if (!clean || clean.length < 5 || clean.length > 120) {
    return { isValid: false, error: "Please provide a valid email address." };
  }

  // General RFC-compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean)) {
    return { isValid: false, error: "Please provide a valid email format (e.g. name@domain.com)." };
  }

  const parts = clean.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Please provide a valid email address." };
  }

  const [localPart, domain] = parts;

  // Domain structure check
  const domainParts = domain.split(".");
  if (domainParts.length < 2) {
    return { isValid: false, error: "The email domain must include a valid top-level domain (e.g. .com)." };
  }

  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return { isValid: false, error: "Invalid top-level domain." };
  }

  // Check against unwanted dummy / placeholder domains (e.g. example.com, abc.com, etc.com)
  if (UNWANTED_DUMMY_DOMAINS.has(domain)) {
    return {
      isValid: false,
      isUnwanted: true,
      domain,
      error: `The email domain "${domain}" is a placeholder or test domain. Please provide your legitimate, active email address so we can reach you back.`,
    };
  }

  // Check against disposable / temporary mail services
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      isUnwanted: true,
      domain,
      error: `Temporary or disposable email addresses (${domain}) are not accepted. Please use your standard personal or work email address.`,
    };
  }

  // Subdomain check for disposable services (e.g. *.mailinator.com)
  for (const disposable of DISPOSABLE_EMAIL_DOMAINS) {
    if (domain.endsWith("." + disposable)) {
      return {
        isValid: false,
        isUnwanted: true,
        domain,
        error: "Disposable email addresses are not accepted. Please use a verified personal or business email.",
      };
    }
  }

  // Check if username is a dummy string paired with another short/generic domain
  if (SUSPICIOUS_LOCAL_PARTS.has(localPart) && (domain.length <= 8 || domain.startsWith("test"))) {
    return {
      isValid: false,
      isUnwanted: true,
      domain,
      error: `"${clean}" appears to be a placeholder address. Please use your real email address.`,
    };
  }

  // Check for obvious consecutive keyboard strings in domain (e.g. asdfasdf.com)
  if (/^(asdf|qwerty|zxcv|12345)+/.test(domain)) {
    return {
      isValid: false,
      isUnwanted: true,
      domain,
      error: "Please enter a valid, active email domain.",
    };
  }

  return {
    isValid: true,
    cleanEmail: clean,
    domain,
  };
}
