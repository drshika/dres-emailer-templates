import { useState } from "react";

const LoAForm = () => {
    // STATE
    const [studentName, setStudentName] = useState("Your Name");
    const [pronouns, setPronouns] = useState("");
    const [uin, setUin] = useState("########");
    const [accessEmail, setAccessEmail] = useState("example@illinois.edu");
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

My name is ${studentName} (UIN: ${uin}) and I am in your class this semester. 
I am writing to notify you that I have a Letter of Accommodation from DRES (see attached) that I will be utilizing this semester.
Please let me know if you have any specific questions or any specific information for how the accommodations may be applied to this class.
${EMAIL_NEW_LINE}

Best,${EMAIL_NEW_LINE}
${studentName}${EMAIL_NEW_LINE}
${pronouns}${EMAIL_NEW_LINE}
    `;

    const emailBody2 = `
Hello Professor,
${EMAIL_NEW_LINE}

I am reaching out to request an extension for the assignment due insert date as a result of an exacerbation of my disability. 
I would like to request an extension for this assignment to insert date and time. 
I’ve also CCed my Access Specialist on this email too if you have any questions.
${EMAIL_NEW_LINE}

Best,${EMAIL_NEW_LINE}
${studentName}${EMAIL_NEW_LINE}
${pronouns}${EMAIL_NEW_LINE}
   `;

    const emailBody3 = `
Hello Professor,
${EMAIL_NEW_LINE}

I am sending this email to let you know that I am not able to attend class for disability related reasons. 
If you can, please provide an alternative assignment, and if you have any questions, feel free to ask! 
If you would like, I can meet with you to discuss any material missed in class. 
I have also CCed my Access Specialist on this email so they can help answer any questions too.
${EMAIL_NEW_LINE}
 
Best,${EMAIL_NEW_LINE}
${studentName}${EMAIL_NEW_LINE}
${pronouns}${EMAIL_NEW_LINE}
    `;

    const mailToLink1 = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=DRES LOA&body=${emailBody1}`;
    const mailToLink2 = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=Extension Request&body=${emailBody2}`;
    const mailToLink3 = `mailto:professor@example.com?cc=${accessEmailForMailto}&bcc=${professorEmailsForMailto}&subject=Alternative Assignment Request&body=${emailBody3}`;

    const previewText1 = emailBody1.split(EMAIL_NEW_LINE);
    const previewText2 = emailBody2.split(EMAIL_NEW_LINE);
    const previewText3 = emailBody3.split(EMAIL_NEW_LINE);


    return (
        <>
            <h4> UIUC DRES Email Helper</h4>
        <form>
            <label htmlFor="student_name">Name: </label>
            <input type="text" name="student_name" value={studentName}
                onChange={e => setStudentName(e.target.value)} />
            <br />

            <label htmlFor="uin">UIN: </label>
            <input type="text" name="uin" value={uin} 
                onChange={e => setUin(e.target.value)} />
            <br />

            <label htmlFor="pronouns">Pronouns (optional): </label>
            <input type="text" name="pronouns" value={pronouns} 
                onChange={e => setPronouns(e.target.value)}/>
            <br />

            <label htmlFor="access_email">DRES Access Specialist Email/NetID: </label>
            <input type="text" name="access_email" value={accessEmail}
                onChange={e => setAccessEmail(e.target.value)} />
            <br />

            <label for="access_email">Instructor emails/NetIDs (separated by commas): </label>
            <input type="text" name="access_email" value={insEmails}
                onChange={e => setInsEmails(e.target.value)} />
            <br />
        </form>
        
        <p style={{padding: "0px 0px 0px 25px"}}><strong>Previews: </strong></p>
        <div style={{padding: "0px 0px 0px 50px"}}>
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
        <p style={{padding: "0px 0px 0px 25px"}}>
            <a href={mailToLink1} target="_blank" rel="noopener noreferrer">Open Template 1 in Email Client: </a> <br/>
            <a href={mailToLink2} target="_blank" rel="noopener noreferrer">Open Template 2 in Email Client: </a> <br/>
            <a href={mailToLink3} target="_blank" rel="noopener noreferrer">Open Template 3 in Email Client: </a> <br/> <br/>
            <strong> Please do not forget any applicable attachments! </strong>
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