import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react"

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError(null)
    setIsSubmitted(false)

    console.log("📤 Submitting contact form:", formState)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

      const response = await fetch("https://email-sending-zeta.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      let data: any = {}
      try {
        data = await response.json()
      } catch {
        // response might be empty
      }

      console.log("📩 API Response:", response.status, data)

      if (!response.ok) {
        throw new Error(data?.error || "Failed to send email")
      }

      // ✅ Success
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      console.log("✅ Email sent successfully")

      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (err: any) {
      console.error("❌ Contact form error:", err)

      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.")
      } else {
        setError(err.message || "Failed to send message. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }


  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "roshanmoger502@gmail.com",
      href: "mailto:roshanmoger502@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8970035508",
      href: "tel:+918970035508",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mysore, India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Roshan-moger",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/roshan-moger",
    },
  ]

  return (
    <section id="contact" ref={ref} className="relative py-16">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: "var(--gradient-secondary)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from
            you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <div className="glass-card p-8 rounded-2xl border border-border/60 shadow-md shadow-black/5 dark:shadow-none">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border/50 shadow-sm hover:bg-muted/70 transition-all group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="glass-card p-8 rounded-2xl border border-border/60 shadow-md shadow-black/5 dark:shadow-none">
              <h3 className="text-xl font-semibold mb-6">Follow Me</h3>

              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all"
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-6 rounded-2xl border border-border/60 shadow-md shadow-black/5 dark:shadow-none">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-muted-foreground">
                  Currently available for freelance projects
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {["Name", "Email", "Message"].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <label className="block text-sm font-medium mb-2">
                    {label}
                  </label>

                  {label !== "Message" ? (
                    <input
                      type={label === "Email" ? "email" : "text"}
                      required
                      value={
                        label === "Name"
                          ? formState.name
                          : formState.email
                      }
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          [label === "Name" ? "name" : "email"]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl glass-card border border-border/60 shadow-sm shadow-black/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-transparent outline-none transition-all dark:shadow-none"
                    />
                  ) : (
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl glass-card border border-border/60 shadow-sm shadow-black/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-transparent outline-none resize-none transition-all dark:shadow-none"
                    />
                  )}
                </motion.div>
              ))}


              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 rounded-xl font-medium text-primary-foreground border border-primary/30 shadow-md shadow-black/10 dark:shadow-none"
                style={{ background: "var(--gradient-primary)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: 0.6 }}
              >
                {!isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" /> Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message
                      </>
                    )}
                  </span>
                ) : (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                )}
              </motion.button>
            </form>
          </motion.div>


        </div>
      </div>
    </section>
  )
}

export default ContactSection
