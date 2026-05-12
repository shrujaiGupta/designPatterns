/**
 * Builder pattern — email example
 * --------------------------------
 * Without a builder, you tend to get one of:
 *
 * 1) A huge constructor: new Email(from, to, subject, body, cc, bcc, replyTo, html, attachments, ...)
 *    — hard to read at call sites, error-prone argument order, many parameters often undefined.
 *
 * 2) Telescoping overloads: constructor with 3 args, 5 args, 8 args — still awkward and
 *    duplicates defaults across overloads. If 4 args, then total number of overloads is 2^4 = 16. (multiple combinations)
 *
 * 3) A bag-of-properties object: { from, to, ... } with everything optional — easy to forget
 *    required fields until runtime, no fluent API, no step-by-step validation in one place.
 *
 * A builder (`new EmailBuilder()`) helps by:
 * - Named, chainable methods (only set what you need).
 * - Sensible optional fields (cc, bcc, attachments) without "undefined slots" in a long param list.
 * - Central validation in build() (required: from, to, subject, and at least one body type).
 * - A single, immutable Email instance once built (clear lifecycle).
 * - Room to add defaults, encoding, or attachment limits in one class later without changing
 *   every call site.
 */

import { Email } from "./models/Email";
import { EmailBuilder } from "./builders/EmailBuilder";

async function main(): Promise<void> {
  // Fluent construction — order of calls does not need to match parameter order
  const draft: EmailBuilder = new EmailBuilder()
    .setFrom("me@example.com")
    .setTo(["you@example.com", "other@example.com"])
    .setCc("manager@example.com")
    .setBcc("archive@example.com")
    .setSubject("Q3 report")
    .setBody("Please find the report attached.")
    .setHtmlBody("<p>Please find the <em>report</em> attached.</p>")
    .setReplyTo("support@example.com")
    .setAttachment({ filename: "report.pdf", content: "<binary placeholder>", mimeType: "application/pdf" });

  const message: Email = await draft.build();

  console.log("Built email summary:");
  console.log({
    from: message.from,
    to: message.to,
    cc: message.cc,
    bcc: message.bcc,
    subject: message.subject,
    hasHtml: message.htmlBody !== undefined,
    attachmentCount: message.attachments?.length ?? 0,
  });
}

void main();
