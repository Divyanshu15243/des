import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBlogPosts } from "@/data/mockData";
import blogImg1 from "@/assets/blog-1.jpg";
import blogImg2 from "@/assets/blog-2.jpg";

const imageMap: Record<string, string> = {
  "/blog-1.jpg": blogImg1,
  "/blog-2.jpg": blogImg2,
};

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const published = mockBlogPosts.filter((p) => p.status === "published");

  const filtered = useMemo(() => {
    return published.filter((p) =>
      !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, published]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginatedPosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-28 pb-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-secondary font-body font-semibold text-sm uppercase tracking-widest mb-3">Insights & News</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Blog</h1>
            <p className="text-primary-foreground/70 font-body text-lg max-w-xl mb-8">
              Expert insights on Dubai real estate investment, market trends, and guides for Indian investors.
            </p>
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="w-full bg-card rounded-lg pl-10 pr-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-heading font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground font-body">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block h-full">
                    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={imageMap[post.featuredImage] || blogImg1}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <Badge variant="outline" className="w-fit mb-3 font-body text-xs">{post.category}</Badge>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                          <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.publishDate)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-body text-sm font-medium transition-colors ${
                    page === i + 1 ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
