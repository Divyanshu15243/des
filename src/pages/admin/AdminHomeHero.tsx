import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminHomeHero = () => {
  const [hero, setHero] = useState<any>(null);
  const [form, setForm] = useState({ mode: "video", video_url: "", overlay_text: "", cta_text: "", cta_link: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from("home_hero" as any).select("*").limit(1).single().then(({ data }) => {
      if (data) { setHero(data); setForm(data as any); }
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    if (hero) {
      const { error } = await supabase.from("home_hero" as any).update(form).eq("id", hero.id);
      if (error) toast.error(error.message); else toast.success("Saved");
    } else {
      const { data, error } = await supabase.from("home_hero" as any).insert(form).select().single();
      if (error) toast.error(error.message); else { setHero(data); toast.success("Created"); }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-heading font-bold">Home Header</h1>
      <Card>
        <CardHeader><CardTitle className="text-base">Hero Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Mode</Label>
            <Select value={form.mode} onValueChange={(v) => setForm({ ...form, mode: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="video">Video</SelectItem><SelectItem value="slider">Slider</SelectItem></SelectContent>
            </Select>
          </div>
          {form.mode === "video" && (
            <div><Label>Video URL</Label><Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} /></div>
          )}
          <div><Label>Overlay Text</Label><Input value={form.overlay_text} onChange={(e) => setForm({ ...form, overlay_text: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>CTA Text</Label><Input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} /></div>
            <div><Label>CTA Link</Label><Input value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} /></div>
          </div>
          <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomeHero;
