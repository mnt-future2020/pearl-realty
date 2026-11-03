"use server";

import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { ContactTemplate, type ContactTemplateProps } from "@/components/emails/ContactTemplate";
import React from "react";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(formData: ContactTemplateProps) {
  try {
    const { name, email } = formData;

    const emailHtml = await render(
      ContactTemplate(formData) as React.ReactElement
    );

    const mailOptions = {
      from: `"Pearl Realty Enquiry" <${process.env.SMTP_USER}>`,
      to: "raghunath@pearlrealty.ae",
      // "Reply" in the inbox goes straight to the visitor, not to the sending Gmail
      replyTo: email,
      subject: `New Assessment Request: ${name}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (err) {
    console.error("Nodemailer Error:", err);
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
