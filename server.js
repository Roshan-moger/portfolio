import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

// Contact form API
app.post("/api/contact", async(req, res) => {
    try {
        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const mailOptions = {
            from: `"Contact Form" <${process.env.SMTP_USER}>`,
            to: "roshanmoger502@gmail.com",
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        }

        await transporter.sendMail(mailOptions)

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        })
    } catch (error) {
        console.error("Email send error:", error)
        res.status(500).json({ error: "Failed to send email" })
    }
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})