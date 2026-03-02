import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Eye } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const AdminContact = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("contact_submissions" as any).select("*").order("created_at", { ascending: false });
    setItems((data as any[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const viewItem = async (item: any) => {
    setSelected(item);
    if (!item.is_read) {
      await supabase.from("contact_submissions" as any).update({ is_read: true }).eq("id", item.id);
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("contact_submissions" as any).delete().eq("id", id);
    toast.success("Deleted");
    fetchData();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading font-bold">Contact Submissions</h1>
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id} className={!s.is_read ? "font-semibold" : ""}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell className="text-sm">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Badge variant={s.is_read ? "secondary" : "default"}>{s.is_read ? "Read" : "New"}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => viewItem(s)}><Eye size={14} /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="icon" variant="ghost"><Trash2 size={14} className="text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(s.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No submissions</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Message from {selected?.name}</DialogTitle></DialogHeader>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> {selected?.email}</p>
            {selected?.phone && <p><strong>Phone:</strong> {selected?.phone}</p>}
            {selected?.company && <p><strong>Company:</strong> {selected?.company}</p>}
            <p className="pt-2 whitespace-pre-wrap">{selected?.message}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContact;
