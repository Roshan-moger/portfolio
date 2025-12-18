import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Send, Mail, Phone, MapPin, Github, Linkedin, Check } from 'lucide-react';

const CyberContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'contact@roshanmoger.dev', href: 'mailto:contact@roshanmoger.dev' },
    { icon: Phone, label: 'Phone', value: '+91-8970035508', href: 'tel:+918970035508' },
    { icon: MapPin, label: 'Location', value: 'Mysore, India', href: '#' },
  ];

  const socials = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Roshan-moger' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/roshan-moger' },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-primary text-sm tracking-widest">{'// GET IN TOUCH'}</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Contact Form */}
          <ScrollReveal direction="left">
            <div className="cyber-glass p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold mb-6 text-gradient">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 cyber-glass rounded-lg bg-transparent border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 cyber-glass rounded-lg bg-transparent border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 cyber-glass rounded-lg bg-transparent border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full cyber-btn-primary flex items-center justify-center gap-2 ${
                    isSubmitted ? 'bg-green-500' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Sent Successfully!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="cyber-glass p-8 rounded-2xl">
                <h3 className="font-display text-2xl font-bold mb-6 text-gradient">
                  Contact Info
                </h3>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 cyber-glass rounded-xl flex items-center justify-center group-hover:glow-cyan transition-shadow">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">{item.label}</span>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="cyber-glass p-8 rounded-2xl">
                <h3 className="font-display text-xl font-bold mb-6 text-gradient">
                  Follow Me
                </h3>

                <div className="flex gap-4">
                  {socials.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 p-4 cyber-glass rounded-xl flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <motion.div
                className="cyber-glass p-6 rounded-2xl text-center"
                animate={{ boxShadow: ['0 0 0 0 rgba(0,255,255,0)', '0 0 20px 5px rgba(0,255,255,0.2)', '0 0 0 0 rgba(0,255,255,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-500 font-semibold">Available for hire</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Open to new opportunities and exciting projects
                </p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CyberContact;