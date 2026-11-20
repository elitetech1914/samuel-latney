"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Icon } from "./icon";

async function submitForm(
  form: HTMLFormElement,
  kind: "contact" | "newsletter",
) {
  const fields = Object.fromEntries(new FormData(form).entries());
  const response = await fetch("/api/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, kind }),
  });
  const result = await response.json();
  if (!response.ok)
    throw new Error(
      result.error || "We couldn’t send that just now. Please try again.",
    );
}

function Honeypot() {
  return (
    <div className="honeypot" aria-hidden="true">
      <label>
        Leave this field empty
        <input name="website" autoComplete="off" tabIndex={-1} />
      </label>
    </div>
  );
}

export function NewsletterForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "loading") return;
    const form = event.currentTarget;
    setStatus("loading");
    try {
      await submitForm(form, "newsletter");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }
  return (
    <form onSubmit={onSubmit} className="newsletter-form">
      <Honeypot />
      <label htmlFor="reader-email" className="sr-only">
        Your email address
      </label>
      <div className="newsletter-input-row">
        <Icon name="mail" size={20} />
        <input
          id="reader-email"
          type="email"
          name="email"
          placeholder="Your email address"
          required
          maxLength={254}
          autoComplete="email"
          disabled={!enabled || status === "success"}
        />
        <button
          aria-label={
            enabled ? "Join the reader list" : "Reader list coming soon"
          }
          type="submit"
          disabled={!enabled || status === "loading" || status === "success"}
        >
          <Icon
            name={
              status === "loading"
                ? "loading"
                : status === "success"
                  ? "check"
                  : "arrowRight"
            }
            className={status === "loading" ? "animate-spin" : ""}
          />
        </button>
      </div>
      <p className="newsletter-note" aria-live="polite">
        {status === "success" ? (
          "Thank you for signing up for reader updates from Samuel Latney."
        ) : status === "error" ? (
          error
        ) : enabled ? (
          <>
            Occasional notes. Meaningful stories. Unsubscribe anytime.{" "}
            <Link href="/privacy">Privacy</Link>
          </>
        ) : (
          "The reader list is coming soon. A new chapter is on its way."
        )}
      </p>
    </form>
  );
}

export const inquiryCategories = [
  "Reader message",
  "Book club",
  "Media",
  "Event",
  "Collaboration",
  "Publishing",
  "Other",
];

export function ContactForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "loading") return;
    const form = event.currentTarget;
    setStatus("loading");
    try {
      await submitForm(form, "contact");
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  }
  if (status === "success")
    return (
      <div className="form-success" role="status">
        <span className="success-icon">
          <Icon name="check" size={32} />
        </span>
        <h2>Message received</h2>
        <p>
          Thank you for contacting Samuel Latney. If your inquiry needs a
          response, we’ll reply to the email address you provided.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="button button-dark"
        >
          Send another message
          <Icon name="arrowRight" />
        </button>
      </div>
    );
  return (
    <form id="contact-form" onSubmit={onSubmit} className="contact-form">
      <Honeypot />
      <div className="form-row">
        <label>
          Name
          <input
            name="name"
            placeholder="Your full name"
            autoComplete="name"
            required
            maxLength={150}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Organization <span>(optional)</span>
        <input
          name="organization"
          autoComplete="organization"
          placeholder="Book club, publication, podcast, bookstore…"
          maxLength={200}
        />
      </label>
      <label>
        I’m contacting Samuel about
        <select name="category" defaultValue="Reader message">
          {inquiryCategories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>
      <label>
        Subject
        <input
          name="subject"
          placeholder="A short subject line"
          required
          maxLength={200}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us a little about your request or message."
          required
          minLength={10}
          maxLength={6000}
        />
      </label>
      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span>
          I understand my information will be used to respond to this inquiry.{" "}
          <Link href="/privacy">Privacy policy</Link>
        </span>
      </label>
      {!enabled && (
        <p className="form-notice">
          Messages will open soon. This form is not accepting submissions yet.
        </p>
      )}
      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-dark"
        type="submit"
        disabled={!enabled || status === "loading"}
      >
        {status === "loading"
          ? "Sending…"
          : enabled
            ? "Send Message"
            : "Messaging Coming Soon"}
        <Icon
          name={status === "loading" ? "loading" : "send"}
          size={17}
          className={status === "loading" ? "animate-spin" : ""}
        />
      </button>
    </form>
  );
}
