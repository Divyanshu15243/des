import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AdminBlogForm = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", author: "", publish_date: new Date().toISOString().split("T")[0],
    featured_image: "", content: "", category: "", status: "draft",
    meta_title: "", meta_description: "",
  });

  useEffect(() => {
    if (!isNew && id) {
      supabase.from("blog_posts" as any).select("*").eq("id", id).single().then(({ data }) => {
        if (data) setForm({ ...form, ...data as any });
      });
    }
  }, [id]);

  const handleChange = (key: string, value: string) => {
    const updated = { ...form, [key]: value };
    if (key === "title" && (isNew || form.slug === slugify(form.title))) {
      updated.slug = slugify(value);
    }
    setForm(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isNew) {
      const { error } = await supabase.from("blog_posts" as any).insert(form);
      if (error) { toast.error(error.message); } else { toast.success("Post created"); navigate("/admin/blog"); }
    } else {
      const { error } = await supabase.from("blog_posts" as any).update(form).eq("id", id);
      if (error) { toast.error(error.message); } else { toast.success("Post updated"); navigate("/admin/blog"); }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-heading font-bold">{isNew ? "New Blog Post" : "Edit Post"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Title *</Label><Input value={form.title} onChange={(e) => handleChange("title", e.target.value)} required /></div>
          <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} /></div>
          <div><Label>Author</Label><Input value={form.author} onChange={(e) => handleChange("author", e.target.value)} /></div>
          <div><Label>Publish Date</Label><Input type="date" value={form.publish_date} onChange={(e) => handleChange("publish_date", e.target.value)} /></div>
          <div><Label>Featured Image URL</Label><Input value={form.featured_image} onChange={(e) => handleChange("featured_image", e.target.value)} /></div>
          <div><Label>Category</Label><Input value={form.category} onChange={(e) => handleChange("category", e.target.value)} /></div>
        </div>
        <div><Label>Content</Label><Textarea value={form.content} onChange={(e) => handleChange("content", e.target.value)} rows={12} /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => handleChange("status", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Meta Title</Label><Input value={form.meta_title} onChange={(e) => handleChange("meta_title", e.target.value)} /></div>
          <div><Label>Meta Description</Label><Input value={form.meta_description} onChange={(e) => handleChange("meta_description", e.target.value)} /></div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : isNew ? "Create" : "Update"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
