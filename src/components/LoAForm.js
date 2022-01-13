import { useState } from "react";

const LoAForm = () => {
    // STATE

    const [studentName, setStudentName] = useState("ENTER NAME");
    const [pronouns, setPronouns] = useState("");
    const [uin, setUin] = useState("UIN");
    const [accessEmail, setAccessEmail] = useState("someone@example.com");
    const [insEmails, setInsEmails] = useState("");

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
    }

    // TEMPLATING

    const EMAIL_NEW_LINE = '%0D%0A';
    const accessEmailForMailto = formatEmailId(accessEmail);
    const professorEmailsForMailto = formatInstructorEmails(insEmails);

    const emailBody1 = `
Hello Professor,
${EMAIL_NEW_LINE}${EMAIL_NEW_LINE}

My name is ${studentName} (UIN: ${uin}) and I am in your class this semester. I am writing to 
notify you that I have a Letter of Accommodation from DRES (see attached) that I will be utilizing 
this semester. Do I need to know anything specific for how the accommodations will be applied to 
this class?
${EMAIL_NEW_LINE}${EMAIL_NEW_LINE}

Best,${EMAIL_NEW_LINE}
${studentName}${EMAIL_NEW_LINE}
${pronouns}${EMAIL_NEW_LINE}
    `;

    const emailBody2 = `
Hello Professor,
${EMAIL_NEW_LINE}${EMAIL_NEW_LINE}

I’m reaching out to request an extension for the assignment due insert date as a result of an exacerbation of my disability. May I  request an extension for this assignment to insert date and time. I’ve also CC’d my Access Specialist on this email too if you have any questions.
${EMAIL_NEW_LINE}${EMAIL_NEW_LINE}

Best,${EMAIL_NEW_LINE}
${studentName}${EMAIL_NEW_LINE}
${pronouns}${EMAIL_NEW_LINE}
   `;

    const emailBody3 = `
Hello X,
${EMAIL_NEW_LINE}${EMAIL_NEW_LINE}

I am currently experiencing a flare up of my disability and will not be able to attend class today. As soon as I am able, I would like to try and meet with you to discuss any material missed in class. I have also CC’d my Access Specialist on this email so they can help answer any questions too.
${EMAIL_NEW_LINE}${EMAIL_NEW_LINE}
 
Best,${EMAIL_NEW_LINE}
${studentName}${EMAIL_NEW_LINE}
${pronouns}${EMAIL_NEW_LINE}
    `;

    const mailToLink1 = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=DRES LOA&body=${emailBody1}`;
    const mailToLink2 = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=DRES LOA&body=${emailBody2}`;
    const mailToLink3 = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=DRES LOA&body=${emailBody3}`;


    const previewText1 = emailBody1.split(EMAIL_NEW_LINE);
    const previewText2 = emailBody2.split(EMAIL_NEW_LINE);
    const previewText3 = emailBody3.split(EMAIL_NEW_LINE);


    return (
        <>
        <form>
            <label htmlFor="student_name">Name: </label>
            <input type="text" name="student_name" value={studentName} 
                onChange={e => setStudentName(e.target.value)} />
            <br />

            <label htmlFor="uin">UIN:</label>
            <input type="text" name="uin" value={uin} 
                onChange={e => setUin(e.target.value)} />
            <br />

            <label htmlFor="pronouns">Pronouns (optional): </label>
            <input type="text" name="pronouns" value={pronouns} 
                onChange={e => setPronouns(e.target.value)}/>
            <br />

            <label htmlFor="access_email">DRES Access Specialist email/netid: </label>
            <input type="text" name="access_email" value={accessEmail}
                onChange={e => setAccessEmail(e.target.value)} />
            <br />

            <label for="access_email">Instructor emails/netids (separated by commas):</label>
            <input type="text" name="access_email" value={insEmails}
                onChange={e => setInsEmails(e.target.value)} />
            <br />
        </form>
        
        <p><strong>Preview: </strong></p>
        <div>
            {previewText1.map(
                line => <div>{line}</div> 
            )} <br/>
            {previewText2.map(
                line => <div>{line}</div> 
            )} <br/>
            {previewText3.map(
                line => <div>{line}</div> 
            )}
        </div>
        {/* <p>
            Hello Professor,<br /> <br />

            My name is is {studentName} (UIN: {uin}) and I am in your class this semester. 
            I am writing to notify you that I have a Letter of Accommodation from DRES 
            (see attached) that I will be utilizing this semester. Do I need to know anything
            specific for how the accommodations will be applied to this class?

            <br /> <br />
            Best,<br />
        
            {studentName}<br />
            {pronouns}
        </p> */}
        <p>
            <a href={mailToLink1} target="_blank" rel="noopener noreferrer">Open Template 1 in email client</a> <br/>
            <a href={mailToLink2} target="_blank" rel="noopener noreferrer">Open Template 2 in email client</a> <br/>
            <a href={mailToLink3} target="_blank" rel="noopener noreferrer">Open Template 3 in email client</a> <br/>
            <strong> Don't forget the attachment!</strong>
        </p>
        </>
    );
};

export default LoAForm;

/**
 * TODO: 
 * maxWidth, 
 * better mailto, 
 * DRY form code, rename emails to generic contacts if we don't know netid/email
 * persist data from past loads 
 * if there are multiple forms, synchronize them with each other (less re-entry)
 * add more form templates
 */