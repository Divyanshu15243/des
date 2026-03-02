import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { mockRoadshows } from "@/data/mockData";
import roadshowImg1 from "@/assets/roadshow-1.jpg";
import roadshowImg2 from "@/assets/roadshow-2.jpg";

const imageMap: Record<string, string> = {
  "/roadshow-1.jpg": roadshowImg1,
  "/roadshow-2.jpg": roadshowImg2,
};

const today = new Date().toISOString().split("T")[0];

const upcomingRoadshows = mockRoadshows
  .filter((r) => r.status === "published" && r.endDate >= today)
  .slice(0, 4);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const FeaturedListings = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Upcoming Roadshows
            </h2>
            <p className="text-muted-foreground font-body max-w-md">
              Don't miss our next events — register today to secure your spot
            </p>
          </div>
          <Link to="/roadshows" className="hidden md:block text-sm font-body font-semibold text-secondary hover:underline">
            View All →
          </Link>
        </div>

        {upcomingRoadshows.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body">No upcoming roadshows at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRoadshows.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/roadshows/${r.slug}`} className="group block">
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={imageMap[r.bannerImage] || roadshowImg1}
                        alt={r.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0 rounded-full text-xs">
                        Upcoming
                      </Badge>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap gap-3 mb-2 text-xs text-muted-foreground font-body">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {r.cityName}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(r.startDate)}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">{r.shortDescription}</p>
                      <span className="flex items-center gap-1 text-secondary font-body font-semibold text-sm">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
