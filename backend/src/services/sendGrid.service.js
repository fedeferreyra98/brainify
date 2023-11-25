// @ts-ignore
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

// eslint-disable-next-line no-undef
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
