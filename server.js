import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

console.log("📦 ENV CHECK")
console.log("SMTP_HOST:", process.env.SMTP_HOST)
console.log("SMTP_PORT:", process.env.SMTP_PORT)
console.log("SMTP_USER:", process.env.SMTP_USER)
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "✔️ Loaded" : "❌ Missing")

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

// Verify SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP VERIFY FAILED:", error.message)
    } else {
        console.log("✅ SMTP SERVER READY")
    }
})

// Contact form API with logs
app.post("/api/contact", async(req, res) => {
    console.log("\n📨 /api/contact CALLED")
    console.log("➡️ Request body:", req.body)

    try {
        const { name, email, message } = req.body

        // Validation logs
        if (!name || !email || !message) {
            console.warn("⚠️ Validation failed")
            return res.status(400).json({ error: "All fields are required" })
        }

        console.log("✅ Validation passed")
        console.log("👤 Name:", name)
        console.log("📧 User Email:", email)

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

        console.log("📤 Sending email...")

        const info = await transporter.sendMail(mailOptions)

        console.log("✅ EMAIL SENT SUCCESSFULLY")
        console.log("📨 Message ID:", info.messageId)
        console.log("📬 Response:", info.response)

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
            messageId: info.messageId,
        })
    } catch (error) {
        console.error("❌ EMAIL SEND ERROR")
        console.error("Error message:", error.message)
        console.error(error)

        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})