import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData, { faqSchema } from '@/components/StructuredData';
import { Mail, Phone, ArrowRight } from 'lucide-react';

/**
 * Contact Page - Dark Theme
 * Lead capture and contact information
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData schema={faqSchema} />
      <Header />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-foreground leading-tight mb-4 md:mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
            Ready to implement <span className="text-accent font-semibold">AI experience design</span>, <span className="text-accent font-semibold">personalization at scale</span>, or <span className="text-accent font-semibold">intelligent automation</span>? Let's discuss how we can create transformative <span className="text-accent font-semibold">AI-driven customer experiences</span> for your business.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Email */}
            <div className="p-8 bg-card border border-border rounded-sm">
              <div className="w-12 h-12 bg-primary rounded-sm mb-6 flex items-center justify-center">
                <Mail size={24} className="text-background" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">Reach out directly for inquiries and partnerships.</p>
              <a href="mailto:shaily@experiailabs.com" className="text-primary hover:text-accent transition-all duration-300 font-semibold">
                shaily@experiailabs.com
              </a>
            </div>

            {/* Phone */}
            <div className="p-8 bg-card border border-border rounded-sm">
              <div className="w-12 h-12 bg-accent rounded-sm mb-6 flex items-center justify-center">
                <Phone size={24} className="text-background" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground mb-4">Schedule a call to discuss your vision.</p>
              <p className="text-accent font-semibold">
                Available on Request
              </p>
            </div>

            {/* Location */}
            <div className="p-8 bg-card border border-border rounded-sm">
              <div className="w-12 h-12 bg-primary rounded-sm mb-6 flex items-center justify-center">
                <span className="text-background font-mono font-bold">📍</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">
                Based in Dubai, UAE. Serving clients globally.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-card border border-border rounded-sm">
              <h2 className="text-3xl font-bold font-mono text-foreground mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-foreground font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-semibold mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block text-foreground font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground rounded-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full neon-button inline-flex items-center justify-center gap-2"
                >
                  {submitted ? 'Message Sent! ✓' : 'Send Message'} <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold font-mono text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="p-6 bg-card border border-border rounded-sm">
              <h3 className="text-lg font-bold text-foreground mb-3">What industries do you serve?</h3>
              <p className="text-muted-foreground">
                We work across e-commerce, SaaS, media, hospitality, financial services, and entertainment. Our expertise in AI-driven personalization applies broadly to any industry focused on customer experience.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-sm">
              <h3 className="text-lg font-bold text-foreground mb-3">How long does a typical project take?</h3>
              <p className="text-muted-foreground">
                Project timelines vary based on scope and complexity. Discovery typically takes 2-4 weeks, followed by design and development phases. We'll provide a detailed timeline during our initial consultation.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-sm">
              <h3 className="text-lg font-bold text-foreground mb-3">Do you offer ongoing support?</h3>
              <p className="text-muted-foreground">
                Yes. We provide comprehensive support including monitoring, optimization, and continuous improvement. We can discuss support packages tailored to your needs.
              </p>
            </div>

            <div className="p-6 bg-card border border-border rounded-sm">
              <h3 className="text-lg font-bold text-foreground mb-3">How do you handle data privacy?</h3>
              <p className="text-muted-foreground">
                Privacy is paramount. We follow GDPR, CCPA, and other relevant regulations. All systems are designed with privacy-first principles and transparent data handling practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
