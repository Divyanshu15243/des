import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockAwards } from "@/data/mockData";
import awardImg from "@/assets/award-1.jpg";

const Awards = () => {
  const published = mockAwards.filter((a) => a.status === "published").sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-primary pt-28 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">Recognition</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Awards & Recognition</h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-xl">
              Our commitment to excellence has been recognized across the real estate industry.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {published.map((award, i) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow items-start"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Trophy size={28} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-heading font-semibold">{award.title}</h3>
                    <span className="text-xs font-body font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">{award.year}</span>
                  </div>
                  <p className="text-muted-foreground font-body text-sm">{award.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Awards;
