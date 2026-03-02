import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const AdminFeatures = () => {
  const [items, setItems] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", icon: "", image: "", description: "", sort_order: 0, status: "published" });

  const fetchData = async () => {
    const { data } = await supabase.from("feature_items" as any).select("*").order("sort_order");
    setItems((data as any[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => { setEditing(null); setForm({ title: "", icon: "", image: "", description: "", sort_order: 0, status: "published" }); setDialogOpen(true); };
  const openEdit = (item: any) => { setEditing(item); setForm(item); setDialogOpen(true); };

  const handleSave = async () => {
    if (editing) {
      const { error } = await supabase.from("feature_items" as any).update(form).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("feature_items" as any).insert(form);
      if (error) { toast.error(error.message); return; }
      toast.success("Created");
    }
    setDialogOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("feature_items" as any).delete().eq("id", id);
    toast.success("Deleted"); fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Features</h1>
        <Button onClick={openNew}><Plus size={16} /> Add Feature</Button>
      </div>
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Order</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.title}</TableCell>
                <TableCell>{f.sort_order}</TableCell>
                <TableCell><Badge variant={f.status === "published" ? "default" : "secondary"}>{f.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(f)}><Pencil size={14} /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="icon" variant="ghost"><Trash2 size={14} className="text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(f.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No features</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Feature" : "Add Feature"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Icon (name)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
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

export default AdminFeatures;
