import { useState } from "react";

const LoAForm = () => {
  // STATE
  const [studentName, setStudentName] = useState("Your Name");
  const [pronouns, setPronouns] = useState("");
  const [uin, setUin] = useState("########");
  const [accessEmail, setAccessEmail] = useState("example@illinois.edu");
  const [instructorEmails, setInstructorEmails] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("DRES LOA");

  // HELPERS
  const formatEmailId = (inString) => {
    const cleanString = inString.trim();
    if (cleanString.includes("@")) {
      return cleanString;
    }
    return `${inString}@illinois.edu`;
  };

  const formatInstructorEmails = (rawEmails) => {
    const splitEmails = rawEmails.split(",");
    return splitEmails.map(formatEmailId).join(",");
  };

  // TEMPLATING
  const NEW_LINE = "%0D%0A"; // %0D%0A is the URL encoded version of \r and \n to make it work with email clients
  const TWO_NEW_LINES = NEW_LINE + NEW_LINE;

  const accessEmailForMailto = formatEmailId(accessEmail);
  const professorEmailsForMailto = formatInstructorEmails(instructorEmails);

  const emailIntro = `
Hello Professor,
${TWO_NEW_LINES}
`;

  const emailOutro = `
${TWO_NEW_LINES}
I’ve also CCed my Access Specialist on this email too if you have any questions.
${TWO_NEW_LINES}
Best,${NEW_LINE}
${studentName}${NEW_LINE}
${pronouns}${NEW_LINE}
`;

  const templates = {
    "DRES LOA": `
My name is ${studentName} (UIN: ${uin}) and I am in your class this semester. 
I am writing to notify you that I have a Letter of Accommodation from DRES (see attached) that I will be utilizing this semester.
Please let me know if you have any specific questions or any specific information for how the accommodations may be applied to this class.
`,
    "Extension Request": `
I am reaching out to request an extension for the assignment due insert date as a result of an exacerbation of my disability. 
I would like to request an extension for this assignment to insert date and time. 
`,
    "Alternative Assignment Request": `
I am sending this email to let you know that I am not able to attend class for disability related reasons. 
If you can, please provide an alternative assignment, and if you have any questions, feel free to ask! 
If you would like, I can meet with you to discuss any material missed in class. 
`,
  };

  const emailBody = emailIntro + templates[selectedTemplate] + emailOutro;
  const mailToLink = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=${selectedTemplate}&body=${emailBody}`;
  const previewText = emailBody.split(NEW_LINE);

  return (
    <>
      <h3>Letter of Accommodation Email Template</h3>
      {Object.keys(templates).map((template, index) => (
        <div key={index}>
          <input
            type="radio"
            id={template}
            name="emailTemplate"
            value={template}
            checked={selectedTemplate === template}
            onChange={() => setSelectedTemplate(template)}
          />
          <label htmlFor={template}>{template}</label>
        </div>
      ))}

      <br />

      <p>
        For CBTF accomodations, visit{" "}
        <a href="https://cbtf.illinois.edu/students/dres">
          https://cbtf.illinois.edu/students/dres
        </a>{" "}
        where there is another form that can be used to request accomodations
        for CBTF exams.
      </p>

      <h3>Enter the information</h3>
      <form>
        <label htmlFor="student_name">Name: </label>
        <input
          type="text"
          name="student_name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <br />

        <label htmlFor="uin">UIN: </label>
        <input
          type="text"
          name="uin"
          value={uin}
          onChange={(e) => setUin(e.target.value)}
        />
        <br />

        <label htmlFor="pronouns">Pronouns (optional): </label>
        <input
          type="text"
          name="pronouns"
          value={pronouns}
          onChange={(e) => setPronouns(e.target.value)}
        />
        <br />

        <label htmlFor="access_email">
          DRES Access Specialist Email/NetID:{" "}
        </label>
        <input
          type="text"
          name="access_email"
          value={accessEmail}
          onChange={(e) => setAccessEmail(e.target.value)}
        />
        <br />

        <label htmlFor="access_email">
          Instructor emails/NetIDs (separated by commas):{" "}
        </label>
        <input
          type="text"
          name="access_email"
          value={instructorEmails}
          onChange={(e) => setInstructorEmails(e.target.value)}
        />

        <br />
      </form>

      <p style={{ padding: "0px 0px 0px 25px" }}>
        <strong>Preview: </strong>
      </p>
      <div style={{ padding: "0px 0px 0px 50px" }}>
        {previewText.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <p style={{ padding: "0px 0px 0px 25px" }}>
        <a href={mailToLink}>Open in Email Application (mailto link)</a>
      </p>

      <p style={{ padding: "0px 0px 0px 25px" }}>
        <strong> Please do not forget any applicable attachments! </strong>
      </p>
    </>
  );
};

export default LoAForm;

/**
 * TODO:
 * maxWidth,
 * persist data from past loads
 * add more form templates
 */
