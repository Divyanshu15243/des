import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Newspaper, Calendar, Plus } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total: 0, upcoming: 0, past: 0, blogPublished: 0, blogDraft: 0, cities: 0, contacts: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split("T")[0];
      const [roadshows, blogs, cities, contacts] = await Promise.all([
        supabase.from("roadshows" as any).select("id, end_date, status"),
        supabase.from("blog_posts" as any).select("id, status"),
        supabase.from("cities" as any).select("id"),
        supabase.from("contact_submissions" as any).select("id"),
      ]);

      const rs = (roadshows.data as any[]) || [];
      const bp = (blogs.data as any[]) || [];

      setStats({
        total: rs.length,
        upcoming: rs.filter((r) => r.end_date >= today).length,
        past: rs.filter((r) => r.end_date < today).length,
        blogPublished: bp.filter((b) => b.status === "published").length,
        blogDraft: bp.filter((b) => b.status === "draft").length,
        cities: (cities.data as any[])?.length || 0,
        contacts: (contacts.data as any[])?.length || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Roadshows", value: stats.total, icon: MapPin },
    { title: "Upcoming Events", value: stats.upcoming, icon: Calendar },
    { title: "Past Events", value: stats.past, icon: Calendar },
    { title: "Published Posts", value: stats.blogPublished, icon: Newspaper },
    { title: "Draft Posts", value: stats.blogDraft, icon: Newspaper },
    { title: "Cities", value: stats.cities, icon: MapPin },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild><Link to="/admin/roadshows/new"><Plus size={16} /> Create Roadshow</Link></Button>
        <Button asChild variant="outline"><Link to="/admin/blog/new"><Plus size={16} /> Create Blog Post</Link></Button>
        <Button asChild variant="outline"><Link to="/admin/cities/new"><Plus size={16} /> Add City</Link></Button>
      </div>

      {stats.contacts > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{stats.contacts} total submissions</p>
            <Button asChild variant="link" className="px-0 mt-1"><Link to="/admin/contact">View All →</Link></Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
