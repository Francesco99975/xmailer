import fs from "fs/promises";
import path from "path";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import handlebars from "handlebars";
import { CovidForm } from "../interfaces/covidForm";

const smtpTransport = nodemailer.createTransport(mg({auth: {api_key: process.env.MAILGUN_API_KEY!, domain: process.env.MAILGUN_DOMAIN!}}));

const onMailDev = async (req: Request, res: Response, next: NextFunction) => {
    const covidInfo: CovidForm = req.body as CovidForm;

    try {
        const emailTemplateSource = await fs.readFile(path.join(__dirname, "../templates/ccq.hbs"), "utf8");
        const template = handlebars.compile(emailTemplateSource);

        // console.log(template({covidInfo, color: covidInfo.passed ? 'green' : 'red', result: covidInfo.passed ? 'PASSED' : 'FAILED'}));

        const mailOptions = {
            from: "Cataldi Covid Questionnaire <noreply@ccq.com>",
            to: process.env.DEV_RECEPIENT,
            subject: "Questionnaire COVID-19",
            html: template({covidInfo, color: covidInfo.passed ? 'green' : 'red', result: covidInfo.passed ? 'PASSED' : 'FAILED'})
        }

        await smtpTransport.sendMail(mailOptions);
    } catch (error) {
        return res.json({message: "email Error!", error: error.message});
    }

    return res.json({message: "Email Sent!"});
};


const onMail = (req: Request, res: Response, next: NextFunction) => {
    console.log("Mail");
    return res.json({message: "mail"});
};

export { onMail, onMailDev };