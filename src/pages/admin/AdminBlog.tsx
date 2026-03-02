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

const AdminBlog = () => {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const { data } = await supabase.from("blog_posts" as any).select("*").order("created_at", { ascending: false });
    setItems((data as any[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("blog_posts" as any).delete().eq("id", id);
    toast.success("Post deleted");
    fetchData();
  };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-heading font-bold">Blog Posts</h1>
        <Button asChild><Link to="/admin/blog/new"><Plus size={16} /> New Post</Link></Button>
      </div>
      <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
      <div className="rounded-lg border bg-card overflow-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.author || "—"}</TableCell>
                <TableCell className="text-sm">{p.publish_date}</TableCell>
                <TableCell><Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button asChild size="icon" variant="ghost"><Link to={`/admin/blog/${p.id}`}><Pencil size={14} /></Link></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button size="icon" variant="ghost"><Trash2 size={14} className="text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete this post?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(p.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No posts found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBlog;
