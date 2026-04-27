export interface EmailAttachment {
  filename: string;
  /** e.g. base64 or text content for the demo */
  content: string;
  mimeType?: string;
}
