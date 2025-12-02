import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, Clock } from "lucide-react";
import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPostBySlug, getBlogPostById } from "@/lib/dataService";

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Budi Santoso",
      date: "2025-01-16",
      content: "Artikel yang sangat membantu! Terima kasih ByteNodes."
    },
    {
      id: 2,
      author: "Andi Pratama",
      date: "2025-01-17",
      content: "Tips keamanannya sangat berguna, saya sudah terapkan di server saya."
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");

  // Try to find post by slug first, then by id
  const post = useMemo(() => {
    if (!id) return undefined;
    
    // Try slug first
    let foundPost = getBlogPostBySlug(id);
    
    // If not found and id is numeric, try by id
    if (!foundPost && !isNaN(parseInt(id))) {
      foundPost = getBlogPostById(parseInt(id));
    }
    
    return foundPost;
  }, [id]);

  // Estimate read time
  const readTime = useMemo(() => {
    if (!post) return "5 min";
    const words = post.content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  }, [post]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !commentName.trim()) return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: commentName,
      date: new Date().toISOString().split('T')[0],
      content: newComment
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment("");
    setCommentName("");
  };

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
            <Link to="/blog">
              <Button>Kembali ke Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <article className="container mx-auto max-w-4xl">
          <Link to="/blog" className="inline-flex items-center text-cyan hover:text-cyan-light mb-6">
            ← Kembali ke Blog
          </Link>

          {post.image && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none mb-12 prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Komentar ({comments.length})</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitComment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama</label>
                      <input
                        type="text"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        placeholder="Nama Anda"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Komentar</label>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Tulis komentar Anda..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    <Button type="submit">Kirim Komentar</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold">{comment.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString('id-ID', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
