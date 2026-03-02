import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import agentImg from "@/assets/agent-cta.jpg";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to invest in Dubai?
            </h2>
            <p className="text-primary-foreground/60 font-body mb-8 max-w-md">
              Our investment advisors are ready to help you navigate Dubai's real estate market. Book a free consultation or register for our next roadshow.
            </p>
            <div className="flex gap-4">
              <Link to="/contact">
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-6">
                  Book Consultation
                </Button>
              </Link>
              <Link to="/roadshows">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-6">
                  View Roadshows
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <img src={agentImg} alt="Investment advisor" className="w-72 h-72 rounded-2xl object-cover shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
