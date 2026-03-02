import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { mockBlogPosts } from "@/data/mockData";
import blogImg1 from "@/assets/blog-1.jpg";
import blogImg2 from "@/assets/blog-2.jpg";

const imageMap: Record<string, string> = {
  "/blog-1.jpg": blogImg1,
  "/blog-2.jpg": blogImg2,
};

const BlogDetail = () => {
  const { slug } = useParams();
  const post = mockBlogPosts.find((p) => p.slug === slug && p.status === "published");

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground font-body mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog"><Button>Back to Blog</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imgSrc = imageMap[post.featuredImage] || blogImg1;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-28 pb-16">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary font-body text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <Badge variant="outline" className="mb-4 font-body">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-8">
              <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.publishDate)}</span>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img src={imgSrc} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-lg max-w-none font-body text-foreground" dangerouslySetInnerHTML={{ __html: post.content }} />

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
                <Tag size={16} className="text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-body">{tag}</Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
