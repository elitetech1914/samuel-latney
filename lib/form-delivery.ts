import "server-only";

export function getZohoMailConfig() {
  const host = process.env.ZOHO_SMTP_HOST?.trim();
  const user = process.env.ZOHO_SMTP_USER?.trim();
  const pass = process.env.ZOHO_SMTP_PASSWORD;
  const to = process.env.FORM_EMAIL_TO?.trim() || user;
  const port = Number(process.env.ZOHO_SMTP_PORT?.trim() || "465");

  if (!host || !user || !pass || !to || (port !== 465 && port !== 587)) {
    return null;
  }

  return { host, user, pass, to, port };
}

export function getFormWebhook(kind: "contact" | "newsletter") {
  return kind === "contact"
    ? process.env.CONTACT_WEBHOOK_URL
    : process.env.NEWSLETTER_WEBHOOK_URL;
}

export function isFormEnabled(kind: "contact" | "newsletter") {
  return Boolean(getZohoMailConfig() || getFormWebhook(kind));
}
