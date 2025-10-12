import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // configure transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // or another email provider
    auth: {
      user: "sudheepmsd69@gmail.com",
      pass: "fqev gase hhik hddz", // generate app password if using Gmail
    },
  });

  const mailOptions = {
    from: email,
    to: "sudheepmuruganantham@gmail.com", // your email
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email sending failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
