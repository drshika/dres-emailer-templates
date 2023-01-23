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

  const accessEmailForMailto = formatEmailId(accessEmail);
  const professorEmailsForMailto = formatInstructorEmails(instructorEmails);

  const emailBody1 = `
Hello Professor,
${NEW_LINE}${NEW_LINE}

My name is ${studentName} (UIN: ${uin}) and I am in your class this semester. 
I am writing to notify you that I have a Letter of Accommodation from DRES (see attached) that I will be utilizing this semester.
Please let me know if you have any specific questions or any specific information for how the accommodations may be applied to this class.
${NEW_LINE}

Best,${NEW_LINE}
${studentName}${NEW_LINE}
${pronouns}${NEW_LINE}
    `;

  const emailBody2 = `
Hello Professor,
${NEW_LINE}${NEW_LINE}

I am reaching out to request an extension for the assignment due insert date as a result of an exacerbation of my disability. 
I would like to request an extension for this assignment to insert date and time. 
I’ve also CCed my Access Specialist on this email too if you have any questions.
${NEW_LINE}

Best,${NEW_LINE}
${studentName}${NEW_LINE}
${pronouns}${NEW_LINE}
   `;

  const emailBody3 = `
Hello Professor,
${NEW_LINE}${NEW_LINE}

I am sending this email to let you know that I am not able to attend class for disability related reasons. 
If you can, please provide an alternative assignment, and if you have any questions, feel free to ask! 
If you would like, I can meet with you to discuss any material missed in class. 
I have also CCed my Access Specialist on this email so they can help answer any questions too.
${NEW_LINE}
 
Best,${NEW_LINE}
${studentName}${NEW_LINE}
${pronouns}${NEW_LINE}
    `;

  const templates = {
    "DRES LOA": emailBody1,
    "Extension Request": emailBody2,
    "Alternative Assignment Request": emailBody3
  };

  const emailBody = templates[selectedTemplate];
  const mailToLink = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=${selectedTemplate}&body=${emailBody}`;
  const previewText = emailBody.split(NEW_LINE);

  return (
    <>
      <h4> UIUC DRES Email Helper</h4>
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

        <label for="access_email">
          Instructor emails/NetIDs (separated by commas):{" "}
        </label>
        <input
          type="text"
          name="access_email"
          value={instructorEmails}
          onChange={(e) => setInstructorEmails(e.target.value)}
        />

        <br />
        <label htmlFor="template">Select template: </label>
        <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
          {Object.keys(templates).map((template) => (
            <option value={template}>{template}</option>
          ))}
        </select>
        <br />
      </form>

      <p style={{ padding: "0px 0px 0px 25px" }}>
        <strong>Previews: </strong>
      </p>
      <div style={{ padding: "0px 0px 0px 50px" }}>
        {previewText.map((line) => (
          <div>{line}</div>
        ))}{" "}
      </div>

      <p style={{ padding: "0px 0px 0px 25px" }}>
        <a href={mailToLink} target="_blank" rel="noopener noreferrer">
          Open in Email Client
        </a>
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
 * DRY form code, rename emails to generic contacts if we don't know netid/email
 * persist data from past loads
 * add more form templates
 */
