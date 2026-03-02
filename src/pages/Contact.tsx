import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-primary pt-28 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-xl">
              Have questions about Dubai real estate investment? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "UAE Office", text: "20th Floor, Al Moosa Tower 1, Trade Centre, Sheikh Zayed Road, Dubai" },
                { icon: Building, title: "Branch Offices", text: "Amritsar, Punjab, India\nLisbon, Portugal, Europe" },
                { icon: Phone, title: "Call Us", text: "800-0099" },
                { icon: Mail, title: "Email Us", text: "Info@wolvesint.ae" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground font-body text-sm whitespace-pre-line">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Name *</label>
                    <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100}
                      className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255}
                      className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20}
                      className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="800-0099" />
                  </div>
                  <div>
                    <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Company</label>
                    <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} maxLength={100}
                      className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Your company" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Message *</label>
                  <textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} rows={5}
                    className="w-full bg-muted rounded-lg px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                    placeholder="Tell us about your investment interests..." />
                </div>
                <Button type="submit" disabled={submitting} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl px-8" size="lg">
                  <Send size={16} className="mr-2" /> {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;