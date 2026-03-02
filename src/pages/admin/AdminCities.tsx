import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AdminCities = () => {
  const [items, setItems] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: "", slug: "", featured_image: "", status: "published" });

  const fetchData = async () => {
    const { data } = await supabase.from("cities" as any).select("*").order("name");
    setItems((data as any[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: "", slug: "", featured_image: "", status: "published" }); setDialogOpen(true); };
  const openEdit = (item: any) => { setEditing(item); setForm({ name: item.name, slug: item.slug, featured_image: item.featured_image || "", status: item.status }); setDialogOpen(true); };

  const handleSave = async () => {
    const payload = { ...form, slug: form.slug || slugify(form.name) };
    if (editing) {
      const { error } = await supabase.from("cities" as any).update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("City updated");
    } else {
      const { error } = await supabase.from("cities" as any).insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("City created");
    }
    setDialogOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("cities" as any).delete().eq("id", id);
    toast.success("City deleted");
    fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Cities</h1>
        <Button onClick={openNew}><Plus size={16} /> Add City</Button>
      </div>
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Slug</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                <TableCell><Badge variant={c.status === "published" ? "default" : "secondary"}>{c.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil size={14} /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="icon" variant="ghost"><Trash2 size={14} className="text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete this city?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(c.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No cities found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit City" : "Add City"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })} /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} /></div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="unpublished">Unpublished</SelectItem></SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCities;
