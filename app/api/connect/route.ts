import nodemailer from "nodemailer";
import { getFormWebhook, getZohoMailConfig } from "@/lib/form-delivery";
import { formatFormEmail } from "@/lib/form-email";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const categories = [
  "Reader message",
  "Book club",
  "Media",
  "Event",
  "Collaboration",
  "Publishing",
  "Other",
];

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const publicOrigin = publicSiteUrl
    ? URL.parse(publicSiteUrl)?.origin
    : undefined;
  if (
    origin &&
    origin !== new URL(request.url).origin &&
    origin !== publicOrigin
  )
    return Response.json(
      { error: "Please submit this form from the website." },
      { status: 403 },
    );
  const raw = await request.text();
  if (raw.length > 16000)
    return Response.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  let fields: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error("Invalid form");
    fields = parsed as Record<string, unknown>;
  } catch {
    return Response.json(
      { error: "Please check your form and try again." },
      { status: 400 },
    );
  }
  if (fields.website)
    return Response.json(
      { error: "Unable to submit this form." },
      { status: 400 },
    );
  if (fields.kind !== "contact" && fields.kind !== "newsletter")
    return Response.json({ error: "Unknown form." }, { status: 400 });
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  if (!emailPattern.test(email) || email.length > 254)
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  const payload: Record<string, string> = { kind: fields.kind, email };
  if (fields.kind === "contact") {
    for (const [key, max, min] of [
      ["name", 150, 1],
      ["subject", 200, 1],
      ["message", 6000, 10],
    ] as const) {
      const value = typeof fields[key] === "string" ? fields[key].trim() : "";
      if (value.length < min || value.length > max)
        return Response.json(
          { error: `Please check your ${key}.` },
          { status: 400 },
        );
      payload[key] = value;
    }
    if (fields.consent !== "on")
      return Response.json(
        { error: "Please confirm your consent before sending." },
        { status: 400 },
      );
    if (
      typeof fields.category !== "string" ||
      !categories.includes(fields.category)
    )
      return Response.json(
        { error: "Please choose an inquiry category." },
        { status: 400 },
      );
    if (
      fields.organization !== undefined &&
      (typeof fields.organization !== "string" ||
        fields.organization.length > 200)
    )
      return Response.json(
        { error: "Please check your organization name." },
        { status: 400 },
      );
    payload.category = fields.category;
    payload.organization =
      typeof fields.organization === "string" ? fields.organization.trim() : "";
    payload.consent = "true";
  }
  const mail = getZohoMailConfig();
  const endpoint = getFormWebhook(fields.kind);
  if (!mail && !endpoint)
    return Response.json(
      {
        error:
          "This form is not accepting submissions yet. Please check back soon.",
      },
      { status: 503 },
    );
  try {
    if (mail) {
      const transport = nodemailer.createTransport({
        host: mail.host,
        port: mail.port,
        secure: mail.port === 465,
        requireTLS: mail.port === 587,
        auth: { user: mail.user, pass: mail.pass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        dnsTimeout: 10000,
      });
      await transport.sendMail({
        from: mail.user,
        to: mail.to,
        ...formatFormEmail(payload),
      });
    } else if (endpoint) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.FORM_WEBHOOK_SECRET
            ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_SECRET}` }
            : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) {
        console.error("Form webhook rejected submission", {
          kind: fields.kind,
          status: response.status,
        });
        throw new Error("Delivery failed");
      }
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Form delivery failed", {
      kind: fields.kind,
      method: mail ? "smtp" : "webhook",
      code:
        error instanceof Error &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : undefined,
      smtpResponseCode:
        mail &&
        error instanceof Error &&
        "responseCode" in error &&
        typeof error.responseCode === "number"
          ? error.responseCode
          : undefined,
    });
    return Response.json(
      {
        error:
          "We couldn’t send your message just now. Please try again later.",
      },
      { status: 502 },
    );
  }
}
