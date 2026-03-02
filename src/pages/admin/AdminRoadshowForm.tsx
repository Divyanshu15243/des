import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Plus, Trash2 } from "lucide-react";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Convert empty strings to null for nullable DB columns */
const emptyToNull = (v: string | undefined | null): string | null =>
  v && v.trim().length > 0 ? v.trim() : null;

interface Highlight { icon: string; title: string; description: string }
interface Destination { title: string; description: string; image: string; features: string[] }
interface Amenity { icon: string; title: string }
interface Faq { question: string; answer: string }

const ICON_OPTIONS = ["Building2", "TrendingUp", "Shield", "Waves", "TreePine", "Dumbbell", "Bike", "ShoppingBag", "Stethoscope", "Calendar"];

const AdminRoadshowForm = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", city_id: "", venue: "", start_date: "", end_date: "",
    short_description: "", full_description: "", banner_image: "", registration_link: "",
    status: "draft", meta_title: "", meta_description: "",
  });
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    supabase.from("cities").select("id, name").then(({ data }) => setCities(data || []));
    if (!isNew && id) {
      supabase.from("roadshows").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title || "",
            slug: data.slug || "",
            city_id: data.city_id || "",
            venue: data.venue || "",
            start_date: data.start_date || "",
            end_date: data.end_date || "",
            short_description: data.short_description || "",
            full_description: data.full_description || "",
            banner_image: data.banner_image || "",
            registration_link: data.registration_link || "",
            status: data.status || "draft",
            meta_title: data.meta_title || "",
            meta_description: data.meta_description || "",
          });
          setHighlights(Array.isArray(data.investment_highlights) ? (data.investment_highlights as unknown as Highlight[]) : []);
          setDestinations(Array.isArray(data.destinations) ? (data.destinations as unknown as Destination[]) : []);
          setAmenities(Array.isArray(data.amenities) ? (data.amenities as unknown as Amenity[]) : []);
          setFaqs(Array.isArray(data.faqs) ? (data.faqs as unknown as Faq[]) : []);
        }
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // 1) Check auth session first
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        toast.error("Your session has expired. Please log in again.");
        navigate("/admin/login");
        return;           // finally will still reset loading
      }

      // 2) Validate required fields
      const title = form.title.trim();
      const slug = form.slug.trim();
      if (!title || !slug || !form.start_date || !form.end_date) {
        toast.error("Please fill all required fields (Title, Slug, Start Date, End Date).");
        return;
      }

      // 3) Build sanitised payload
      const payload = {
        title,
        slug,
        city_id: emptyToNull(form.city_id),
        venue: emptyToNull(form.venue),
        start_date: form.start_date,
        end_date: form.end_date,
        short_description: emptyToNull(form.short_description),
        full_description: emptyToNull(form.full_description),
        banner_image: emptyToNull(form.banner_image),
        registration_link: emptyToNull(form.registration_link),
        status: form.status || "draft",
        meta_title: emptyToNull(form.meta_title),
        meta_description: emptyToNull(form.meta_description),
        investment_highlights: highlights as unknown as Json[],
        destinations: destinations as unknown as Json[],
        amenities: amenities as unknown as Json[],
        faqs: faqs
          .map((f) => ({ question: f.question?.trim() || "", answer: f.answer?.trim() || "" }))
          .filter((f) => f.question || f.answer) as unknown as Json[],
      };

      console.info("[AdminRoadshowForm] Submitting payload", { isNew, id, payload });

      // 4) Execute save
      let data: any;
      let error: any;

      if (isNew) {
        const res = await supabase.from("roadshows").insert(payload).select("id").single();
        data = res.data;
        error = res.error;
      } else {
        if (!id) { toast.error("Missing roadshow ID."); return; }
        const res = await supabase.from("roadshows").update(payload).eq("id", id).select("id").single();
        data = res.data;
        error = res.error;
      }

      if (error) {
        console.error("[AdminRoadshowForm] Supabase error", error);
        toast.error(error.message || "Failed to save roadshow.");
        return;
      }

      if (!data?.id) {
        console.error("[AdminRoadshowForm] No record returned", data);
        toast.error("Save completed but no record was returned. Please check the roadshows list.");
        navigate("/admin/roadshows");
        return;
      }

      console.info("[AdminRoadshowForm] Save success", data.id);
      toast.success(isNew ? "Roadshow created!" : "Roadshow updated!");
      navigate("/admin/roadshows");
    } catch (err: any) {
      console.error("[AdminRoadshowForm] Unexpected error", err);
      toast.error(err?.message || "An unexpected error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-heading font-bold">{isNew ? "New Roadshow" : "Edit Roadshow"}</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info */}
        <fieldset className="border border-border rounded-xl p-5 space-y-4">
          <legend className="text-sm font-heading font-semibold px-2">Basic Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Title *</Label><Input value={form.title} onChange={(e) => handleChange("title", e.target.value)} required /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} /></div>
            <div>
              <Label>City</Label>
              <Select value={form.city_id} onValueChange={(v) => handleChange("city_id", v)}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>{cities.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Venue</Label><Input value={form.venue} onChange={(e) => handleChange("venue", e.target.value)} /></div>
            <div><Label>Start Date *</Label><Input type="date" value={form.start_date} onChange={(e) => handleChange("start_date", e.target.value)} required /></div>
            <div><Label>End Date *</Label><Input type="date" value={form.end_date} onChange={(e) => handleChange("end_date", e.target.value)} required /></div>
            <div><Label>Banner Image URL</Label><Input value={form.banner_image} onChange={(e) => handleChange("banner_image", e.target.value)} /></div>
            <div><Label>Registration Link</Label><Input value={form.registration_link} onChange={(e) => handleChange("registration_link", e.target.value)} /></div>
          </div>
          <div><Label>Short Description</Label><Textarea value={form.short_description} onChange={(e) => handleChange("short_description", e.target.value)} rows={2} /></div>
          <div><Label>Full Description (HTML)</Label><Textarea value={form.full_description} onChange={(e) => handleChange("full_description", e.target.value)} rows={6} /></div>
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
        </fieldset>

        {/* Investment Highlights */}
        <fieldset className="border border-border rounded-xl p-5 space-y-4">
          <legend className="text-sm font-heading font-semibold px-2">Investment Highlights</legend>
          {highlights.map((h, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-muted p-3 rounded-lg">
              <div>
                <Label>Icon</Label>
                <Select value={h.icon} onValueChange={(v) => { const u = [...highlights]; u[i].icon = v; setHighlights(u); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ICON_OPTIONS.map(ic => <SelectItem key={ic} value={ic}>{ic}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Title</Label><Input value={h.title} onChange={(e) => { const u = [...highlights]; u[i].title = e.target.value; setHighlights(u); }} /></div>
              <div><Label>Description</Label><Input value={h.description} onChange={(e) => { const u = [...highlights]; u[i].description = e.target.value; setHighlights(u); }} /></div>
              <Button type="button" variant="destructive" size="icon" onClick={() => setHighlights(highlights.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => setHighlights([...highlights, { icon: "Building2", title: "", description: "" }])}>
            <Plus size={14} className="mr-1" /> Add Highlight
          </Button>
        </fieldset>

        {/* Destinations */}
        <fieldset className="border border-border rounded-xl p-5 space-y-4">
          <legend className="text-sm font-heading font-semibold px-2">Destinations / Properties</legend>
          {destinations.map((d, i) => (
            <div key={i} className="space-y-3 bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Title</Label><Input value={d.title} onChange={(e) => { const u = [...destinations]; u[i].title = e.target.value; setDestinations(u); }} /></div>
                <div><Label>Image URL</Label><Input value={d.image} onChange={(e) => { const u = [...destinations]; u[i].image = e.target.value; setDestinations(u); }} /></div>
              </div>
              <div><Label>Description</Label><Textarea value={d.description} onChange={(e) => { const u = [...destinations]; u[i].description = e.target.value; setDestinations(u); }} rows={2} /></div>
              <div><Label>Features (comma-separated)</Label><Input value={d.features.join(", ")} onChange={(e) => { const u = [...destinations]; u[i].features = e.target.value.split(",").map(s => s.trim()).filter(Boolean); setDestinations(u); }} /></div>
              <Button type="button" variant="destructive" size="sm" onClick={() => setDestinations(destinations.filter((_, j) => j !== i))}><Trash2 size={14} className="mr-1" /> Remove</Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => setDestinations([...destinations, { title: "", description: "", image: "", features: [] }])}>
            <Plus size={14} className="mr-1" /> Add Destination
          </Button>
        </fieldset>

        {/* Amenities */}
        <fieldset className="border border-border rounded-xl p-5 space-y-4">
          <legend className="text-sm font-heading font-semibold px-2">Amenities</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {amenities.map((a, i) => (
              <div key={i} className="flex gap-2 items-end bg-muted p-3 rounded-lg">
                <div className="flex-1">
                  <Label>Icon</Label>
                  <Select value={a.icon} onValueChange={(v) => { const u = [...amenities]; u[i].icon = v; setAmenities(u); }}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{ICON_OPTIONS.map(ic => <SelectItem key={ic} value={ic}>{ic}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="flex-1"><Label>Title</Label><Input value={a.title} onChange={(e) => { const u = [...amenities]; u[i].title = e.target.value; setAmenities(u); }} /></div>
                <Button type="button" variant="destructive" size="icon" onClick={() => setAmenities(amenities.filter((_, j) => j !== i))}><Trash2 size={16} /></Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => setAmenities([...amenities, { icon: "Building2", title: "" }])}>
            <Plus size={14} className="mr-1" /> Add Amenity
          </Button>
        </fieldset>

        {/* FAQs */}
        <fieldset className="border border-border rounded-xl p-5 space-y-4">
          <legend className="text-sm font-heading font-semibold px-2">FAQs</legend>
          {faqs.map((f, i) => (
            <div key={i} className="space-y-2 bg-muted p-4 rounded-lg">
              <div><Label>Question</Label><Input value={f.question} onChange={(e) => { const u = [...faqs]; u[i].question = e.target.value; setFaqs(u); }} /></div>
              <div><Label>Answer</Label><Textarea value={f.answer} onChange={(e) => { const u = [...faqs]; u[i].answer = e.target.value; setFaqs(u); }} rows={2} /></div>
              <Button type="button" variant="destructive" size="sm" onClick={() => setFaqs(faqs.filter((_, j) => j !== i))}><Trash2 size={14} className="mr-1" /> Remove</Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}>
            <Plus size={14} className="mr-1" /> Add FAQ
          </Button>
        </fieldset>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : isNew ? "Create" : "Update"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/roadshows")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminRoadshowForm;
