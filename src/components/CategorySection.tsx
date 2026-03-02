import { TrendingUp, ShieldCheck, Banknote, Globe, Landmark } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  { icon: Banknote, label: "Tax-Free Returns", desc: "Zero property, capital gains & income tax on Dubai investments" },
  { icon: TrendingUp, label: "High Rental Yields", desc: "6–11% average yields — outperforming London, NYC & Mumbai" },
  { icon: Globe, label: "Dollar-Linked Assets", desc: "UAE Dirham pegged to USD, protecting against INR depreciation" },
  { icon: ShieldCheck, label: "Trusted Developers", desc: "We partner with only government-approved top-tier developers" },
  { icon: Landmark, label: "Flexible Payment Plans", desc: "As low as 10% down with multi-year installment options" },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Why Invest in Dubai Real Estate?
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Discover why thousands of Indian investors choose Dubai for wealth creation
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-secondary hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                <item.icon size={26} className="text-foreground group-hover:text-secondary transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-body font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
