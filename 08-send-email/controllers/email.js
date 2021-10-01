const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_EMAIL_FROM, SENDGRID_API_KEY } = process.env;

// ethereal
const sendEmailEthereal = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'logan.gislason65@ethereal.email',
      pass: 'BD9FHd8uepF7wKbxgB',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Coding Addict" <codingaddict@gmail.com>', // sender address
    to: 'example@example.com', // list of receivers
    subject: 'Sending email with Ethereal', // subject line
    html: '<h2>Sending email with Ethereal!</h2>', // html body
  });

  res.json(info);
};

// sendgrid
const sendEmail = async (req, res) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    from: SENDGRID_API_EMAIL_FROM,
    to: 'example@gmail.com',
    subject: 'Sending email with SendGrid',
    html: '<h2>Sending email with SendGrid!</h2>',
  };

  const info = await sgMail.send(msg);
  res.json(info);
};

module.exports = sendEmail;
