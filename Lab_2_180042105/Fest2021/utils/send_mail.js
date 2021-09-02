const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationMail = (receiver,eventName,name,mailId) => {
  let mailOptions = {
    to: receiver,
    subject: `Confirmation for ${eventName} event`,
    html: `Hello ${name}! </br> Your registration is successfull for ${eventName} Event. Your ID is : ${mailId} . </br> Thanks for registering`,
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });

};

module.exports = sendConfirmationMail;