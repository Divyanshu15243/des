import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/DestinationROIFutureVideo.mp4";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/60" />
      </div>

      <div className="container relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-4">
            Dubai Real Estate Roadshows Across India
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            Your Gateway to Dubai Real Estate
          </h1>
          <p className="text-primary-foreground/70 font-body text-lg mb-10 max-w-lg">
            Attend our exclusive roadshows across major Indian cities. Meet top Dubai developers, explore premium properties, and unlock tax-free investment returns of 6–11%.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/roadshows">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl px-8 py-6 text-base">
              <Calendar size={18} className="mr-2" />
              Explore Upcoming Roadshows
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl px-8 py-6 text-base">
              Book a Consultation
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-8 md:gap-12"
        >
          {[
            { value: "50+", label: "Roadshows Hosted" },
            { value: "15+", label: "Cities Covered" },
            { value: "2,000+", label: "Investors Connected" },
            { value: "6–11%", label: "Avg. Rental Yield" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-heading font-bold text-secondary">{stat.value}</p>
              <p className="text-sm font-body text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
