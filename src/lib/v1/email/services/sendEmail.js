const nodemailer = require("nodemailer");
const { errors } = require("../../../../errors");

const sendEmail = async ({ data }) => {
  // If mail data doesn't pass
  if (!data) {
    throw new errors.BadRequestError(`Invalid Credentials`);
  }

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transport.sendMail({
      from: "Mr. Anik",
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log("Message send: ", info.messageId);
    // console.log("Preview Url: ", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    if (err.message) {
      console.log(`[SEND_EMAIL]: ${err.message}`);
    }

    throw new errors.InternalServerError(`Sending Email Failed`);
  }
};

module.exports = { sendEmail };
