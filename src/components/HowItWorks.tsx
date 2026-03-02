import { CalendarCheck, Users, Key } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: CalendarCheck, title: "Register for a Roadshow", desc: "Pick a city near you and register for our upcoming Dubai real estate roadshow event." },
  { icon: Users, title: "Meet Developers & Advisors", desc: "Get face-to-face access to top Dubai developers and our investment advisors at the event." },
  { icon: Key, title: "Secure Your Investment", desc: "Choose your property, complete documentation, and start earning tax-free returns." },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Three simple steps to invest in Dubai real estate
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <step.icon size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
