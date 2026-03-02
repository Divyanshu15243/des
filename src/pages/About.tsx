import { motion } from "framer-motion";
import { Target, Users, Globe, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/about-hero.jpg";

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "20+", label: "Roadshow Events" },
  { value: "6", label: "Cities Covered" },
  { value: "₹200Cr+", label: "Investment Facilitated" },
];

const values = [
  { icon: Target, title: "Transparency", description: "Complete transparency in every transaction. No hidden fees, no surprises." },
  { icon: Users, title: "Client First", description: "Your investment goals drive every recommendation we make." },
  { icon: Globe, title: "Global Reach", description: "Deep connections with Dubai's top developers and market experts." },
  { icon: Award, title: "Excellence", description: "Award-winning service recognized across the real estate industry." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutHero} alt="About DestinationROI" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container relative z-10 pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">Who We Are</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-4">About Us</h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-xl">
              DestinationROI bridges Indian investors with Dubai's premium real estate opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl font-heading font-bold text-secondary mb-1">{s.value}</div>
                <div className="text-sm font-body text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none font-body text-muted-foreground text-center">
              <p>
                Founded with a vision to connect Indian investors with the world's most lucrative real estate market,
                DestinationROI has become India's leading Dubai property investment platform.
              </p>
              <p>
                We organize exclusive roadshow events across major Indian cities, bringing top Dubai developers directly
                to investors. Our expert team provides end-to-end support — from property selection and documentation
                to post-purchase management.
              </p>
              <p>
                With over 500 successful transactions and ₹200Cr+ in facilitated investments, we've earned the trust
                of discerning investors looking for tax-free, high-yield opportunities in Dubai's booming property market.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                className="bg-card rounded-2xl p-6 border border-border text-center"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
