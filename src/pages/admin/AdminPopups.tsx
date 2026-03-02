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

const emptyForm = { title: "", body: "", image: "", cta_text: "", cta_link: "", target_pages: "all", trigger_seconds: 5, schedule_start: "", schedule_end: "", frequency: "once_session", status: "inactive" };

const AdminPopups = () => {
  const [items, setItems] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({ ...emptyForm });

  const fetchData = async () => {
    const { data } = await supabase.from("popups" as any).select("*").order("created_at", { ascending: false });
    setItems((data as any[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...emptyForm }); setDialogOpen(true); };
  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ ...item, schedule_start: item.schedule_start?.slice(0, 16) || "", schedule_end: item.schedule_end?.slice(0, 16) || "" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = { ...form, schedule_start: form.schedule_start || null, schedule_end: form.schedule_end || null };
    if (editing) {
      const { error } = await supabase.from("popups" as any).update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Updated");
    } else {
      const { error } = await supabase.from("popups" as any).insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Created");
    }
    setDialogOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("popups" as any).delete().eq("id", id);
    toast.success("Deleted"); fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Popups</h1>
        <Button onClick={openNew}><Plus size={16} /> Add Popup</Button>
      </div>
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Target</TableHead><TableHead>Frequency</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.target_pages}</TableCell>
                <TableCell>{p.frequency}</TableCell>
                <TableCell><Badge variant={p.status === "active" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="icon" variant="ghost"><Trash2 size={14} className="text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(p.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No popups</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Popup" : "Add Popup"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Body</Label><Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={3} /></div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>CTA Text</Label><Input value={form.cta_text} onChange={(e) => setForm({ ...form, cta_text: e.target.value })} /></div>
              <div><Label>CTA Link</Label><Input value={form.cta_link} onChange={(e) => setForm({ ...form, cta_link: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Target Pages</Label>
                <Select value={form.target_pages} onValueChange={(v) => setForm({ ...form, target_pages: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="home">Home</SelectItem><SelectItem value="all">All Pages</SelectItem><SelectItem value="selected">Selected</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label>Trigger (seconds)</Label><Input type="number" value={form.trigger_seconds} onChange={(e) => setForm({ ...form, trigger_seconds: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Schedule Start</Label><Input type="datetime-local" value={form.schedule_start} onChange={(e) => setForm({ ...form, schedule_start: e.target.value })} /></div>
              <div><Label>Schedule End</Label><Input type="datetime-local" value={form.schedule_end} onChange={(e) => setForm({ ...form, schedule_end: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Frequency</Label>
                <Select value={form.frequency} onValueChange={(v) => setForm({ ...form, frequency: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="once_session">Once per session</SelectItem><SelectItem value="once_day">Once per day</SelectItem><SelectItem value="always">Always</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSave} className="w-full">{editing ? "Update" : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPopups;
