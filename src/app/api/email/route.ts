import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import "dotenv/config";

export async function POST(req: NextRequest) {
    const { email, name, message, phone, formLabel, file, fileName } = await req.json();
    console.log({ email, name, message, phone, formLabel, fileName });

    let attachment: Mail.Attachment | undefined = undefined;

    if (file && fileName) {
        try {
            // Extract the base64 data and file type
            const [fileMetadata, fileData] = file.split(',');
            const fileType = fileMetadata.split(':')[1].split(';')[0];

            // Decode base64 to buffer
            const buffer = Buffer.from(fileData, 'base64');

            // Create attachment object
            attachment = {
                filename: fileName,
                content: buffer,
                contentType: fileType
            };

            console.log("Attachment prepared:", fileName, fileType);
        } catch (error) {
            console.log("Error processing file:", error);
            return NextResponse.json({ error: "File processing failed" }, { status: 500 });
        }
    }

    // Set up email transporter (using your existing configuration)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER ?? 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.MAIL_EMAIL ?? 'bradford.rath@ethereal.email',
            pass: process.env.MAIL_PASSWORD ?? 'mkAJM2VDdJD6M5deKH'
        }
    });

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL ?? 'Transition VC Web <noreply@transitionventurecapital.com>',
        to: process.env.TARGET_EMAIL ?? 'transitionvc@gmail.com',
        subject: `Form submission: "${formLabel}" from ${name} (${email})`,
        html: `<ul><li>Name: ${name}</li><li>Email: ${email}</li><li>Phone: ${phone}</li><li>Attachment: ${fileName ? fileName : "None"}</li><li>Form Type: ${formLabel}</li></ul><br/><hr/><br/><p>${message}</p>`,
        attachments: attachment ? [attachment] : undefined,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ status: "success", message: "Email sent" });
    } catch (error) {
        console.log("Error sending email:", error);
        return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
    }
}