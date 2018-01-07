const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function sendEmail(msg) {
  sgMail.send(msg);
  return;
}
