import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import city1 from "@/assets/city-1.jpg";
import city2 from "@/assets/city-2.jpg";
import city3 from "@/assets/city-3.jpg";

const cities = [
  { img: city1, name: "Mumbai", desc: "The Taj Mahal Palace" },
  { img: city2, name: "Pune", desc: "JW Marriott Hotel" },
  { img: city3, name: "Delhi", desc: "The Oberoi, New Delhi" },
];

const CitiesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Roadshow Cities
            </h2>
            <p className="text-muted-foreground font-body max-w-md">
              We bring Dubai's finest real estate opportunities to cities across India
            </p>
          </div>
          <Link to="/roadshows" className="hidden md:block text-sm font-body font-semibold text-secondary hover:underline">
            View All Events →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={city.img} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-heading font-bold text-primary-foreground">{city.name}</h3>
                <p className="text-sm font-body text-primary-foreground/70">{city.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
