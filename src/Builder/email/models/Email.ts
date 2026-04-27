import type { EmailAttachment } from "../types/EmailAttachment";

/**
 * Email message (product). Prefer constructing via `EmailBuilder` so optional fields
 * and validation stay in one place.
 */
export class Email {
  private constructor(
    readonly from: string,
    readonly to: string[],
    readonly subject: string,
    readonly body: string,
    readonly cc: string[] | undefined,
    readonly bcc: string[] | undefined,
    readonly replyTo: string | undefined,
    readonly htmlBody: string | undefined,
    readonly attachments: readonly EmailAttachment[] | undefined,
  ) {}

  /** Used by `EmailBuilder.build` so instances can be created without a public many-arg constructor. */
  static fromValidatedParts(
    from: string,
    to: string[],
    subject: string,
    body: string,
    cc: string[] | undefined,
    bcc: string[] | undefined,
    replyTo: string | undefined,
    htmlBody: string | undefined,
    attachments: readonly EmailAttachment[] | undefined,
  ): Email {
    return new Email(
      from,
      to,
      subject,
      body,
      cc,
      bcc,
      replyTo,
      htmlBody,
      attachments,
    );
  }
}
