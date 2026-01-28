import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

/**
 * NotFound Page - 404 Error
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* 404 Section */}
      <section className="flex-1 flex items-center justify-center py-32">
        <div className="container text-center">
          <div className="mb-8">
            <p className="text-8xl font-bold font-mono text-primary mb-4">404</p>
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you are looking for does not exist. Let us help you find what you need.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <a className="neon-button inline-flex items-center justify-center gap-2">
                Back to Home <ArrowRight size={18} />
              </a>
            </Link>
            <Link href="/contact">
              <a className="px-6 py-3 font-semibold border-2 border-foreground text-foreground hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2">
                Contact Us <ArrowRight size={18} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
