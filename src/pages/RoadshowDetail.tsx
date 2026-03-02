import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, MapPin, ArrowLeft, ExternalLink, User, Clock,
  Building2, TrendingUp, Shield, ChevronDown, ChevronUp,
  Waves, TreePine, Dumbbell, Bike, ShoppingBag, Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockRoadshows } from "@/data/mockData";
import roadshowImg1 from "@/assets/roadshow-1.jpg";
import roadshowImg2 from "@/assets/roadshow-2.jpg";

const imageMap: Record<string, string> = {
  "/roadshow-1.jpg": roadshowImg1,
  "/roadshow-2.jpg": roadshowImg2,
};

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  Shield: <Shield size={28} />,
  Waves: <Waves size={28} />,
  TreePine: <TreePine size={28} />,
  Dumbbell: <Dumbbell size={28} />,
  Bike: <Bike size={28} />,
  ShoppingBag: <ShoppingBag size={28} />,
  Stethoscope: <Stethoscope size={28} />,
};

const RoadshowDetail = () => {
  const { slug } = useParams();
  const roadshow = mockRoadshows.find((r) => r.slug === slug && r.status === "published");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  if (!roadshow) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Roadshow Not Found</h1>
          <p className="text-muted-foreground font-body mb-6">The roadshow you're looking for doesn't exist.</p>
          <Link to="/roadshows"><Button>Back to Roadshows</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isUpcoming = roadshow.endDate >= new Date().toISOString().split("T")[0];
  const bannerSrc = imageMap[roadshow.bannerImage] || roadshowImg1;

  // Use new fields if they exist, otherwise provide defaults
  const investmentHighlights = (roadshow as any).investmentHighlights || [
    { icon: "Building2", title: "6%+ ROI Guarantee", description: "Guaranteed rental returns on select properties in prime Dubai locations." },
    { icon: "TrendingUp", title: "Rental Income 6-11%", description: "Average rental yields significantly higher than major global cities." },
    { icon: "Shield", title: "Tax-Free Returns", description: "Zero property tax, zero capital gains tax, and zero income tax." },
  ];

  const destinations = (roadshow as any).destinations || [
    { title: "Yas Island", description: "Home to Ferrari World, Yas Waterworld, and Warner Bros World. A premier entertainment destination with luxury residences.", image: roadshowImg1, features: ["Ferrari World", "Yas Waterworld", "Yas Marina Circuit"] },
    { title: "Dubai Marina", description: "One of the most sought-after waterfront communities with stunning views, world-class dining, and premium lifestyle amenities.", image: roadshowImg2, features: ["Waterfront Living", "Premium Dining", "Beach Access"] },
  ];

  const amenities = (roadshow as any).amenities || [
    { icon: "Building2", title: "Clubhouses" },
    { icon: "Waves", title: "Private Beaches" },
    { icon: "Waves", title: "Swimming Pools" },
    { icon: "Dumbbell", title: "Fitness Centers" },
    { icon: "Bike", title: "Cycling Tracks" },
    { icon: "ShoppingBag", title: "Retail & Dining" },
    { icon: "Stethoscope", title: "Healthcare" },
    { icon: "TreePine", title: "Landscaped Parks" },
  ];

  const faqs = (roadshow as any).faqs || [
    { question: "Who should attend this roadshow?", answer: "This roadshow is ideal for investors, HNIs, and professionals looking to diversify their portfolio with international real estate." },
    { question: "What documents do I need to bring?", answer: "Bring a valid photo ID and proof of address. For immediate bookings, bring your passport copy and payment method." },
    { question: "Is there any entry fee?", answer: "No, the roadshow is completely free to attend. However, registration is required due to limited seats." },
    { question: "Can I bring a family member or business partner?", answer: "Yes, you can register additional guests through the registration link." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={bannerSrc} alt={roadshow.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        <div className="container relative z-10 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/roadshows" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-secondary font-body text-sm mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to Roadshows
              </Link>
              <Badge className={`mb-4 ${isUpcoming ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                {isUpcoming ? "Upcoming Event" : "Past Event"}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-5 leading-tight">
                {roadshow.title}
              </h1>
              <p className="text-primary-foreground/70 font-body text-lg mb-6 max-w-lg">
                {roadshow.shortDescription}
              </p>
              <div className="flex flex-wrap gap-4 text-primary-foreground/80 font-body text-sm mb-8">
                <span className="flex items-center gap-2"><MapPin size={16} /> {roadshow.venue}, {roadshow.cityName}</span>
                <span className="flex items-center gap-2"><Calendar size={16} /> {formatDate(roadshow.startDate)}</span>
              </div>
              {isUpcoming && roadshow.registrationLink && (
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl text-base px-8">
                  <ExternalLink size={18} className="mr-2" /> Register for Roadshow
                </Button>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <img src={bannerSrc} alt={roadshow.title} className="rounded-2xl shadow-2xl w-full max-w-md mx-auto border-4 border-primary-foreground/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-heading font-bold mb-6">About This Roadshow</h2>
              <div className="prose prose-lg max-w-none font-body text-muted-foreground" dangerouslySetInnerHTML={{ __html: roadshow.fullDescription }} />
              {isUpcoming && roadshow.registrationLink && (
                <Button className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl">
                  Register Now
                </Button>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <img src={bannerSrc} alt="About" className="rounded-2xl shadow-lg w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-2">Why Invest</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Investment in Dubai Real Estate</h2>
            <p className="text-muted-foreground font-body mt-3 max-w-2xl mx-auto">
              Dubai offers unparalleled returns, tax advantages, and world-class infrastructure for global investors.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {investmentHighlights.map((h: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-secondary">
                  {iconMap[h.icon] || <Building2 size={28} />}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">{h.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations / Properties */}
      {destinations.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-2">Featured</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Your neighbours won't be buildings. They're global destinations.</h2>
            </div>
            <div className="space-y-16">
              {destinations.map((d: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    <img src={d.image && imageMap[d.image] ? imageMap[d.image] : bannerSrc} alt={d.title}
                      className="rounded-2xl shadow-lg w-full aspect-[16/10] object-cover" />
                  </div>
                  <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                    <h3 className="text-2xl font-heading font-bold mb-4">{d.title}</h3>
                    <p className="text-muted-foreground font-body mb-5">{d.description}</p>
                    {d.features && d.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {d.features.map((f: string, fi: number) => (
                          <Badge key={fi} variant="outline" className="font-body">{f}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-2">Lifestyle</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">World-Class Amenities and Facilities</h2>
              <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
                Enjoy premium lifestyle amenities that redefine luxury living.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {amenities.map((a: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-6 text-center hover:border-secondary/40 transition-colors">
                  <div className="text-secondary mb-3 flex justify-center">
                    {iconMap[a.icon] || <Building2 size={28} />}
                  </div>
                  <p className="text-sm font-body font-medium">{a.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Event Agenda */}
      {roadshow.agenda && roadshow.agenda.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-2">Schedule</p>
              <h2 className="text-3xl font-heading font-bold">What You'll Experience</h2>
            </div>
            <div className="space-y-4">
              {roadshow.agenda.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex gap-5 p-5 bg-background rounded-xl border border-border">
                  <div className="flex items-center gap-2 text-secondary font-body font-semibold text-sm whitespace-nowrap min-w-[110px]">
                    <Clock size={14} /> {item.time}
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-foreground">{item.title}</h4>
                    {item.description && <p className="text-sm text-muted-foreground font-body mt-1">{item.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Speakers */}
      {roadshow.speakers && roadshow.speakers.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-2">Meet the Team</p>
              <h2 className="text-3xl font-heading font-bold">Speakers & Advisors</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {roadshow.speakers.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-secondary" />
                  </div>
                  <h4 className="font-body font-semibold text-foreground text-lg">{s.name}</h4>
                  <p className="text-sm text-muted-foreground font-body">{s.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="text-3xl font-heading font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="bg-background border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-body font-semibold text-foreground hover:text-secondary transition-colors">
                    {faq.question}
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-muted-foreground font-body text-sm">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Registration CTA */}
      {isUpcoming && roadshow.registrationLink && (
        <section className="py-20">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-16 text-center">
              <div className="absolute inset-0 opacity-20">
                <img src={bannerSrc} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">Limited Seats</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                  Invitation Only: Investor Registration
                </h2>
                <p className="text-primary-foreground/70 font-body max-w-xl mx-auto mb-8">
                  Register now to secure your spot at this exclusive roadshow event. Limited seats available.
                </p>
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl text-base px-10">
                  <ExternalLink size={18} className="mr-2" /> Register Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Tags */}
      {roadshow.tags.length > 0 && (
        <div className="container pb-12">
          <div className="flex flex-wrap gap-2">
            {roadshow.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-body">{tag}</Badge>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RoadshowDetail;
