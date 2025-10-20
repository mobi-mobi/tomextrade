import React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  company: string;
  message: string;
}

const EmailTemplate = ({
  name,
  email,
  company,
  message,
}: EmailTemplateProps) => {
  return (
    <div>
      New contact form submission: <br />
      Name: {name} <br />
      Email: {email} {company ? `Company: ${company}` : ""} <br />
      Message: {message} <br />
      --- Submitted:
      {new Date().toLocaleString("en-US", {
        timeZone: "Europe/Prague",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
};

export default EmailTemplate;
