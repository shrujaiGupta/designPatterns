import Joi from "joi";
import type { EmailAttachment } from "../types/EmailAttachment";

const attachmentItem = Joi.object<EmailAttachment>({
  filename: Joi.string().required(),
  content: Joi.string().required(),
  mimeType: Joi.string().optional(),
});

/**
 * Validated shape before constructing {@link import("../models/Email").Email}.
 */
export interface EmailBuilderPayload {
  from: string;
  to: string[];
  subject: string;
  body: string;
  htmlBody: string | undefined;
  cc: string[] | undefined;
  bcc: string[] | undefined;
  replyTo: string | undefined;
  attachments: EmailAttachment[] | undefined;
}

export const emailBuilderPayloadSchema: Joi.ObjectSchema<EmailBuilderPayload> = Joi.object({
  from: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Email: 'from' is required",
      "any.required": "Email: 'from' is required",
    }),
  to: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(1)
    .required()
    .messages({ "array.min": "Email: at least one 'to' address is required" }),
  subject: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.empty": "Email: 'subject' is required",
      "any.required": "Email: 'subject' is required",
    }),
  body: Joi.string().allow("").default(""),
  htmlBody: Joi.string().allow("").optional(),
  cc: Joi.array().items(Joi.string()).optional(),
  bcc: Joi.array().items(Joi.string()).optional(),
  replyTo: Joi.string().allow("").optional(),
  attachments: Joi.array().items(attachmentItem).optional(),
})
  .custom((value, helpers) => {
    const v = value as EmailBuilderPayload;
    const hasBody = v.body.length > 0;
    const hasHtml = v.htmlBody !== undefined && v.htmlBody.length > 0;
    if (!hasBody && !hasHtml) {
      return helpers.error("any.custom", {
        message: "Email: provide at least one of 'body' or 'htmlBody'",
      });
    }
    return v;
  })
  .messages({
    "any.custom": "{{#message}}",
  });
