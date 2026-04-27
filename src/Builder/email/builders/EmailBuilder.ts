import { Email } from "../models/Email";
import type { EmailAttachment } from "../types/EmailAttachment";
import { emailBuilderPayloadSchema } from "../validation/emailBuilderSchema";

export class EmailBuilder {
  private fromValue = "";
  private toList: string[] = [];
  private subjectValue = "";
  private bodyValue = "";
  private ccList: string[] | undefined;
  private bccList: string[] | undefined;
  private replyToValue: string | undefined;
  private htmlBodyValue: string | undefined;
  private attachmentList: EmailAttachment[] | undefined;

  setFrom(address: string): this {
    this.fromValue = address;
    return this;
  }

  setTo(addresses: string | string[]): this {
    this.toList = Array.isArray(addresses) ? [...addresses] : [addresses];
    return this;
  }

  setCc(addresses: string | string[] | undefined): this {
    if (addresses === undefined) {
      this.ccList = undefined;
      return this;
    }
    this.ccList = Array.isArray(addresses) ? [...addresses] : [addresses];
    return this;
  }

  setBcc(addresses: string | string[] | undefined): this {
    if (addresses === undefined) {
      this.bccList = undefined;
      return this;
    }
    this.bccList = Array.isArray(addresses) ? [...addresses] : [addresses];
    return this;
  }

  setSubject(text: string): this {
    this.subjectValue = text;
    return this;
  }

  setBody(text: string): this {
    this.bodyValue = text;
    return this;
  }

  setHtmlBody(html: string | undefined): this {
    this.htmlBodyValue = html;
    return this;
  }

  setReplyTo(address: string | undefined): this {
    this.replyToValue = address;
    return this;
  }

  setAttachment(attachment: EmailAttachment): this {
    if (!this.attachmentList) {
      this.attachmentList = [];
    }
    this.attachmentList.push(attachment);
    return this;
  }

  async build(): Promise<Email> {
    const value = await emailBuilderPayloadSchema.validateAsync(
      {
        from: this.fromValue,
        to: this.toList,
        subject: this.subjectValue,
        body: this.bodyValue,
        htmlBody: this.htmlBodyValue,
        cc: this.ccList,
        bcc: this.bccList,
        replyTo: this.replyToValue,
        attachments: this.attachmentList,
      },
      { abortEarly: false },
    );

    return Email.fromValidatedParts(
      value.from,
      [...value.to],
      value.subject,
      value.body,
      value.cc ? [...value.cc] : undefined,
      value.bcc ? [...value.bcc] : undefined,
      value.replyTo,
      value.htmlBody,
      value.attachments ? [...value.attachments] : undefined,
    );
  }
}
