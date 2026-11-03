import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Img,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

export interface ContactTemplateProps {
  name: string;
  email: string;
  enquiringAs: string;
  jurisdictions: string;
  allocation: string;
  timeline: string;
  resolve?: string;
  introducedBy?: string;
}

export const ContactTemplate = ({
  name,
  email,
  enquiringAs,
  jurisdictions,
  allocation,
  timeline,
  resolve,
  introducedBy,
}: ContactTemplateProps) => (
  <Html>
    <Head />
    <Preview>New Assessment Request: {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={heading}>Pearl Realty</Heading>
          <Text style={subheading}>Private Wealth Advisory & Strategic Real Estate</Text>
        </Section>
        
        <Section style={content}>
          <Text style={paragraph}>
            <strong>New Assessment Request</strong>
          </Text>
          
          <Hr style={hr} />
          
          {[
            { label: "Full Name", text: name },
            { label: "Email", text: email },
            { label: "Enquiring as", text: enquiringAs },
            { label: "Principal jurisdiction(s)", text: jurisdictions },
            { label: "Indicative allocation", text: allocation },
            { label: "Timeline", text: timeline },
          ].map((detail) => (
            <Row key={detail.label} style={detailRow}>
              <Column style={labelCol}>
                <Text style={label}>{detail.label}</Text>
              </Column>
              <Column>
                <Text style={value}>{detail.text}</Text>
              </Column>
            </Row>
          ))}

          {/* Optional answers only appear when the visitor filled them in */}
          {[
            { label: "What would you most like to resolve?", text: resolve },
            { label: "Introduced by", text: introducedBy },
          ]
            .filter((answer) => answer.text?.trim())
            .map((answer) => (
              <Section key={answer.label}>
                <Hr style={hr} />
                <Text style={label}>{answer.label}</Text>
                <Section style={messageContainer}>
                  <Text style={messageText}>{answer.text}</Text>
                </Section>
              </Section>
            ))}
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            © 2026 Pearl Realty | DIFC, Dubai UAE
          </Text>
          <Text style={footerText}>
            Strictly Private & Confidential
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 0 60px",
  marginBottom: "64px",
  maxWidth: "600px",
  border: "1px solid #e6ebf1",
};

const header = {
  backgroundColor: "#14140F",
  padding: "40px 20px",
  textAlign: "center" as const,
};

const heading = {
  color: "#C19B6C",
  fontSize: "32px",
  fontWeight: "300",
  letterSpacing: "0.2em",
  margin: "0",
  textTransform: "uppercase" as const,
};

const subheading = {
  color: "rgba(193, 155, 108, 0.6)",
  fontSize: "10px",
  letterSpacing: "0.3em",
  margin: "10px 0 0",
  textTransform: "uppercase" as const,
};

const content = {
  padding: "40px",
};

const paragraph = {
  color: "#14140F",
  fontSize: "18px",
  lineHeight: "1.4",
  margin: "0 0 20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const detailRow = {
  padding: "10px 0",
};

const labelCol = {
  width: "190px",
};

const label = {
  color: "#8898aa",
  fontSize: "10px",
  fontWeight: "bold",
  letterSpacing: "0.1em",
  margin: "0",
  textTransform: "uppercase" as const,
};

const value = {
  color: "#14140F",
  fontSize: "14px",
  margin: "0",
};

const messageContainer = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  marginTop: "10px",
};

const messageText = {
  color: "#484848",
  fontSize: "14px",
  fontStyle: "italic",
  lineHeight: "1.6",
  margin: "0",
};

const footer = {
  padding: "0 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#8898aa",
  fontSize: "10px",
  letterSpacing: "0.1em",
  lineHeight: "1.5",
  margin: "0",
  textTransform: "uppercase" as const,
};
