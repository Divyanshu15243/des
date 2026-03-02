import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const AdminRoadshows = () => {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const fetchData = async () => {
    const { data } = await supabase.from("roadshows").select("*, cities(name)").order("start_date", { ascending: false });
    setItems((data as any[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("roadshows").delete().eq("id", id);
    toast.success("Roadshow deleted");
    fetchData();
  };

  const today = new Date().toISOString().split("T")[0];
  const filtered = items
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => {
      if (filter === "upcoming") return i.end_date >= today;
      if (filter === "past") return i.end_date < today;
      return true;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-heading font-bold">Roadshows</h1>
        <Button asChild><Link to="/admin/roadshows/new"><Plus size={16} /> New Roadshow</Link></Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        {(["all", "upcoming", "past"] as const).map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">{f}</Button>
        ))}
      </div>
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell>{(r as any).cities?.name || "—"}</TableCell>
                <TableCell className="text-sm">{r.start_date} → {r.end_date}</TableCell>
                <TableCell><Badge variant={r.status === "published" ? "default" : "secondary"}>{r.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button asChild size="icon" variant="ghost"><Link to={`/admin/roadshows/${r.id}`}><Pencil size={14} /></Link></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="icon" variant="ghost"><Trash2 size={14} className="text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete this roadshow?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(r.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No roadshows found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRoadshows;
