import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { Resend } from "resend"

dotenv.config()

const app = express()
const resend = new Resend(process.env.RESEND_API_KEY)

// Middlewares
app.use(cors())
app.use(express.json())

// Contact form API
app.post("/api/contact", async(req, res) => {
    try {
        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const data = await resend.emails.send({
            from: `Contact Form onboarding@resend.dev`,
            to: "roshanmoger502@gmail.com",
            replyTo: email, // ✅ correct key for Resend
            subject: `New Contact Form Message from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        })

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
            data,
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