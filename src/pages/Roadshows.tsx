import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockRoadshows, mockCities } from "@/data/mockData";
import roadshowHero from "@/assets/roadshow-hero.jpg";
import roadshowImg1 from "@/assets/roadshow-1.jpg";
import roadshowImg2 from "@/assets/roadshow-2.jpg";

const imageMap: Record<string, string> = {
  "/roadshow-1.jpg": roadshowImg1,
  "/roadshow-2.jpg": roadshowImg2,
};

const Roadshows = () => {
  const [cityFilter, setCityFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState<"all" | "upcoming" | "past">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const published = mockRoadshows.filter((r) => r.status === "published");
  const publishedCities = mockCities.filter((c) => c.status === "published");

  const filtered = useMemo(() => {
    return published.filter((r) => {
      if (cityFilter && r.cityId !== cityFilter) return false;
      if (timeFilter === "upcoming" && r.endDate < today) return false;
      if (timeFilter === "past" && r.endDate >= today) return false;
      if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [cityFilter, timeFilter, searchQuery, published, today]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={roadshowHero} alt="DestinationROI Roadshows" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container relative z-10 pt-24 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">Our Events</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-4">
              Roadshows
            </h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-xl">
              Attend our exclusive real estate investment roadshows across India. Meet developers, explore properties, and
              secure your investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search roadshows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted rounded-lg pl-10 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="bg-muted rounded-lg px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-secondary appearance-none w-full md:w-48"
            >
              <option value="">All Cities</option>
              {publishedCities.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              {(["all", "upcoming", "past"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-4 py-2 rounded-md text-sm font-body font-medium capitalize transition-colors ${
                    timeFilter === t ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="py-16">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Filter size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-2">No roadshows found</h3>
              <p className="text-muted-foreground font-body">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((r, i) => {
                const isUpcoming = r.endDate >= today;
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link to={`/roadshows/${r.slug}`} className="group block">
                      <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={imageMap[r.bannerImage] || roadshowImg1}
                            alt={r.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className={`absolute top-4 left-4 ${isUpcoming ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {isUpcoming ? "Upcoming" : "Past Event"}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex flex-wrap gap-3 mb-3 text-sm text-muted-foreground font-body">
                            <span className="flex items-center gap-1"><MapPin size={14} /> {r.cityName}</span>
                            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(r.startDate)} – {formatDate(r.endDate)}</span>
                          </div>
                          <h3 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                            {r.title}
                          </h3>
                          <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2">{r.shortDescription}</p>
                          <div className="flex items-center gap-2 text-secondary font-body font-semibold text-sm">
                            View Details <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Roadshows;
