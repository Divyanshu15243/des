import { motion } from "framer-motion";
import { Play, TrendingUp, Building2, Shield, Globe, Target, Users, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/about-hero.jpg";
import whoWeAre from "@/assets/who-we-are.jpg";
import dubaiSkyline from "@/assets/dubai-skyline.png";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="About" className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 bg-[#0A0E1A]/80" />
        </div>
        <div className="container relative z-10 text-center pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#D6AF5A] font-semibold text-sm uppercase tracking-widest mb-4">About us</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Where UAE Real Estate<br />Meets Real Returns</h1>
            <p className="text-gray-400 text-sm">Home &gt; About us</p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Destination ROI Quote */}
      <section className="py-20 bg-[#0F1420]">
        <div className="container">
          <p className="text-[#D6AF5A] text-sm uppercase tracking-widest mb-8">DESTINATION ROI</p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                "Every destination can deliver a return — when you invest in the right one"<br />
                <span className="text-[#D6AF5A]">And for us, that destination is Dubai</span>
              </h2>
              <Button className="bg-[#D6AF5A] text-black hover:bg-[#C19F4A] rounded-full px-8 py-6 text-base font-semibold">
                Get Trust
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-[#D6AF5A]/20 rounded-3xl" />
              <div className="bg-[#1A1F2E] rounded-3xl p-8 border border-[#D6AF5A]/30 relative">
                <div className="aspect-video bg-black/50 rounded-2xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#D6AF5A] rounded-full flex items-center justify-center">
                    <Play className="text-black fill-black ml-1" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Who We Are */}
      <section className="py-20 bg-[#0A0E1A]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src={whoWeAre} alt="Who We Are" className="aspect-[3/4] object-cover rounded-3xl border border-[#D6AF5A]/30" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#D6AF5A] mb-6">Who We Are</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Destination ROI is a global investment platform connecting international investors to premium Dubai real estate opportunities through immersive roadshows and exclusive events. We bridge the gap between world-class developers and discerning investors seeking high-return property investments.
              </p>
              <h3 className="text-3xl font-bold text-[#D6AF5A] mb-6">Our Legacy</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Founded in 2024, Destination ROI has rapidly built a strong reputation in investor networking and Dubai property showcases. Our commitment to excellence and trust has positioned us as a leading name in international real estate investment events.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-bold text-[#D6AF5A] mb-2">10+</div>
                  <div className="text-sm text-gray-400">Events</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#D6AF5A] mb-2">5+</div>
                  <div className="text-sm text-gray-400">Partners</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#D6AF5A] mb-2">100%</div>
                  <div className="text-sm text-gray-400">Committed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Why Dubai */}
      <section className="py-20 bg-[#0F1420]">
        <div className="container">
          <p className="text-[#D6AF5A] text-sm uppercase tracking-widest mb-4">Benefits</p>
          <h2 className="text-5xl font-bold text-white mb-6">Why Dubai?</h2>
          <p className="text-gray-300 max-w-3xl mb-12">
            Dubai is a global real estate hub offering tax-free returns, strong infrastructure, and unmatched luxury lifestyle appeal. It's the destination of choice for savvy investors worldwide.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#1A1F2E] rounded-3xl p-8 border border-[#D6AF5A]/20">
              <Globe className="text-[#D6AF5A] mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">Global Investment Hub</h3>
              <p className="text-gray-400">Dubai offers tax-free returns, strong capital appreciation and a secure market.</p>
            </div>
            <div className="bg-[#1A1F2E] rounded-3xl p-8 border border-[#D6AF5A]/20">
              <Building2 className="text-[#D6AF5A] mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">Luxury Living Redefined</h3>
              <p className="text-gray-400">Premium residences, world-class amenities, and unmatched lifestyle.</p>
            </div>
            <div className="bg-[#1A1F2E] rounded-3xl p-8 border border-[#D6AF5A]/20">
              <Shield className="text-[#D6AF5A] mb-4" size={40} />
              <h3 className="text-2xl font-bold text-white mb-4">Investor-Friendly Policies</h3>
              <p className="text-gray-400">100% foreign ownership, zero tax, and visa advantages for investors.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#D6AF5A] mb-2">3B</div>
              <div className="text-gray-400">Total Sales</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#D6AF5A] mb-2">447M</div>
              <div className="text-gray-400">Total Mortgaged</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#D6AF5A] mb-2">79M</div>
              <div className="text-gray-400">Gifts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What We Do */}
      <section className="py-20 bg-[#0A0E1A]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#D6AF5A] text-sm uppercase tracking-widest mb-4">What</p>
              <h2 className="text-5xl font-bold text-white mb-8">We Do</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ChevronRight className="text-[#D6AF5A] mt-1" size={20} />
                <p className="text-gray-300">Host global roadshows in premier international cities</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-[#D6AF5A] mt-1" size={20} />
                <p className="text-gray-300">Connect international investors with top Dubai developers</p>
              </div>
              <div className="flex items-start gap-3">
                <ChevronRight className="text-[#D6AF5A] mt-1" size={20} />
                <p className="text-gray-300">Build trust through premium locations and immersive experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Destination ROI */}
      <section className="py-20 bg-[#0F1420]">
        <div className="container">
          <p className="text-[#D6AF5A] text-sm uppercase tracking-widest mb-4">Why</p>
          <h2 className="text-5xl font-bold text-white mb-12">Destination ROI?</h2>
          
          <div className="space-y-12">
            <div className="bg-[#1A1F2E] rounded-3xl p-10 border border-[#D6AF5A]/20">
              <h3 className="text-3xl font-bold text-[#D6AF5A] mb-8">OUR VISION</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <Target className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Global Trust</h4>
                    <p className="text-gray-400">We aim to be the trusted name in Dubai real estate across the world.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Award className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Immersive Experiences</h4>
                    <p className="text-gray-400">We don't just market events; we craft display-level experiences with prime opportunities.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Investor Empowerment</h4>
                    <p className="text-gray-400">Our platform simplifies selection, helping investors act with clarity and confidence.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <TrendingUp className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">High-Return Focus</h4>
                    <p className="text-gray-400">Every strategy we design is shaped around sustainable and strategic global returns.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1F2E] rounded-3xl p-10 border border-[#D6AF5A]/20">
              <h3 className="text-3xl font-bold text-[#D6AF5A] mb-8">OUR MISSION</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <Globe className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">World-Class Expansion</h4>
                    <p className="text-gray-400">Bringing Dubai real estate roadshows to international business capitals for global investors.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Building2 className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Elite Developer Showcases</h4>
                    <p className="text-gray-400">Curating exclusive Dubai developments presented with high-tier regional value.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Flawless Investment Journey</h4>
                    <p className="text-gray-400">From roadshow to investment, our referral and onboarding process supports every step.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Award className="text-[#D6AF5A] flex-shrink-0" size={24} />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Global Wealth Connections</h4>
                    <p className="text-gray-400">Connecting UAE assets with ultra-high-net-worth Dubai and global investors under one umbrella.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Explore Roadshows */}
      <section className="py-20 bg-[#0A0E1A]">
        <div className="container">
          <div className="relative bg-gradient-to-r from-[#1A1F2E] to-[#0F1420] rounded-3xl p-12 md:p-16 border border-[#D6AF5A]/30 overflow-hidden">
            <img src={dubaiSkyline} alt="Dubai Skyline" className="absolute inset-0 w-full h-full object-cover opacity-20" />
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore Roadshows</h2>
              <p className="text-gray-300 text-lg mb-8">
                Join us on our journey of roadshows in London, Kuala Lumpur, Frankfurt, Singapore, and other world-class cities.
              </p>
              <Link to="/roadshows">
                <Button className="bg-[#D6AF5A] text-black hover:bg-[#C19F4A] rounded-full px-8 py-6 text-base font-semibold">
                  Join Roadshows
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Contact */}
      <section className="py-20 bg-[#0F1420]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Invest in Dubai?</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Join the next Destination ROI event and connect with our expert advisors. Discover premium Dubai properties and unlock tax-free investment opportunities with guaranteed returns.
              </p>
              <Link to="/contact">
                <Button className="bg-[#D6AF5A] text-black hover:bg-[#C19F4A] rounded-full px-8 py-6 text-base font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="bg-[#1A1F2E] rounded-3xl h-[400px] border border-[#D6AF5A]/20 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1726876837634!2d55.27493!3d25.197197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85bf7%3A0x4c5a1a1a1a1a1a1a!2sAl%20Moosa%20Tower%201%2C%20Sheikh%20Zayed%20Road%2C%20Dubai!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al Moosa Tower 1 Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
