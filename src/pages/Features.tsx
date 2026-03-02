import { motion } from "framer-motion";
import { BarChart3, Building2, Shield, Calendar, TrendingUp, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockFeatures } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  BarChart3, Building2, Shield, Calendar, TrendingUp, CreditCard,
};

const Features = () => {
  const published = mockFeatures.filter((f) => f.status === "published").sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-primary pt-28 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Our Features</h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-xl">
              Everything you need to invest in Dubai real estate with confidence and clarity.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {published.map((feature, i) => {
              const Icon = iconMap[feature.icon] || BarChart3;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow group"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                    <Icon size={28} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
