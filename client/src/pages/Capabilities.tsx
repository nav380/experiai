import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData, { serviceSchema, linkedinCompanySchema } from '@/components/StructuredData';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



/**
 * Capabilities Page - Dark Theme
 * Detailed service offerings and use cases
 * SEO Keywords: AI experience design, personalization at scale, intelligent automation, AI-driven customer experience
 */
export default function Capabilities() {
    useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
      });
    }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData schema={linkedinCompanySchema} />
      <StructuredData schema={serviceSchema} />
      <Header />
      <Breadcrumb />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono text-foreground leading-tight mb-4 md:mb-6">
            Our <span className="text-primary">AI Solutions</span> & Capabilities
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
            We deliver comprehensive <span className="text-accent font-semibold">AI experience design</span> and <span className="text-accent font-semibold">intelligent automation</span> solutions that enable <span className="text-accent font-semibold">personalization at scale</span> and create transformative <span className="text-accent font-semibold">AI-driven customer experiences</span>.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Service 1: AI-Driven Marketing Automation */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-sm overflow-hidden border border-border"
            data-aos="fade-right" data-aos-delay="200">
              <img 
                src="/images/personalization-scale-saffron.png" 
                alt="Personalization at scale visualization showing interconnected data nodes and customer journeys" 
                className="w-full h-auto" 
                loading="lazy"
              />
            </div>
            <div
            data-aos="fade-left" data-aos-delay="400">
              <h2 className="text-4xl font-bold font-mono text-foreground mb-6">AI-Driven Marketing Automation</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Orchestrate campaigns that adapt in real-time based on customer behavior, market conditions, and business objectives. Our <span className="text-accent font-semibold">AI experience design</span> systems learn from every interaction to optimize messaging, timing, and channel selection.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Real-time campaign optimization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Predictive audience segmentation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Dynamic content personalization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Multi-channel orchestration</span>
                </li>
              </ul>
              <a href="/contact" className="neon-button inline-flex items-center gap-2">
                Learn More <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Service 2: Personalization at Scale */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" data-aos-delay="200">
              <h2 className="text-4xl font-bold font-mono text-foreground mb-6">Personalization at Scale</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Move beyond basic segmentation. Our <span className="text-accent font-semibold">intelligent automation</span> systems create truly individualized experiences for millions of users simultaneously, adapting to preferences, behavior, and context in real-time.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">Individual-level personalization</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">Context-aware recommendations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">Privacy-first data architecture</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">A/B testing at scale</span>
                </li>
              </ul>
              <a href="/contact" className="neon-button inline-flex items-center gap-2">
                Explore Solution <ArrowRight size={18} />
              </a>
            </div>
            <div className="rounded-sm overflow-hidden border border-border" data-aos="fade-left" data-aos-delay="400">
              <img 
                src="/images/intelligent-automation-saffron.png" 
                alt="Intelligent automation showing robotic and human collaboration with AI neural networks" 
                className="w-full h-auto" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* Service 3: Experiential Innovation */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-sm overflow-hidden border border-border" data-aos="fade-right" data-aos-delay="200">
              <img 
                src="/images/customer-experience-saffron.png" 
                alt="AI-driven customer experience journey showing omnichannel touchpoints and neural network connections" 
                className="w-full h-auto" 
                loading="lazy"
              />
            </div>
            <div data-aos="fade-left" data-aos-delay="400">
              <h2 className="text-4xl font-bold font-mono text-foreground mb-6">Experiential Innovation</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Transform physical and digital spaces into intelligent ecosystems. We design immersive <span className="text-accent font-semibold">AI-driven customer experiences</span> that blend AI, data, and human creativity to create unforgettable moments.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Immersive event experiences</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Real-time audience engagement</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Adaptive environment systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-muted-foreground">Behavioral analytics & insights</span>
                </li>
              </ul>
              <a href="/contact" className="neon-button inline-flex items-center gap-2">
                Discuss Your Vision <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-6">
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's explore how our <span className="text-accent font-semibold">AI experience design</span> capabilities can drive <span className="text-accent font-semibold">personalization at scale</span> and deliver measurable business impact.
          </p>
          <a href="/contact" className="neon-button inline-flex items-center justify-center gap-2">
            Schedule a Consultation <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
