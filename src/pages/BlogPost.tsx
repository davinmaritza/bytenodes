import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, User, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  readTime?: string;
}

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your PHP backend API endpoint
    // fetch(`https://your-vps-domain.com/api/blog/posts/${id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setPost(data.post);
    //     setComments(data.comments);
    //     setLoading(false);
    //   });

    // Demo data for now
    const demoPost: BlogPost = {
      id: parseInt(id || "1"),
      title: "Getting Started with VPS Hosting",
      content: `
        <h2>Introduction to VPS Hosting</h2>
        <p>Virtual Private Server (VPS) hosting is a powerful solution that bridges the gap between shared hosting and dedicated servers. It provides you with dedicated resources within a shared environment, offering better performance, control, and scalability.</p>
        
        <h2>Why Choose VPS Hosting?</h2>
        <p>VPS hosting offers several advantages over traditional shared hosting:</p>
        <ul>
          <li><strong>Dedicated Resources:</strong> Get guaranteed CPU, RAM, and storage that aren't shared with other users</li>
          <li><strong>Root Access:</strong> Full control over your server environment</li>
          <li><strong>Scalability:</strong> Easily upgrade resources as your needs grow</li>
          <li><strong>Better Performance:</strong> Faster loading times and better reliability</li>
          <li><strong>Enhanced Security:</strong> Isolated environment protects your data</li>
        </ul>

        <h2>Setting Up Your First VPS</h2>
        <p>Getting started with VPS hosting is straightforward. Follow these steps:</p>
        <ol>
          <li>Choose your operating system (Ubuntu, CentOS, Debian, etc.)</li>
          <li>Select your server resources based on your needs</li>
          <li>Configure your firewall and security settings</li>
          <li>Install necessary software and applications</li>
          <li>Set up your domain and DNS records</li>
        </ol>

        <h2>Best Practices for VPS Management</h2>
        <p>To get the most out of your VPS hosting:</p>
        <ul>
          <li>Keep your system updated with the latest security patches</li>
          <li>Implement regular backup strategies</li>
          <li>Monitor server resources and performance</li>
          <li>Use strong passwords and SSH keys</li>
          <li>Configure fail2ban to prevent brute force attacks</li>
        </ul>

        <h2>Conclusion</h2>
        <p>VPS hosting is an excellent choice for growing websites and applications. With the right setup and maintenance, it provides a robust, scalable platform for your online presence.</p>
      `,
      author: "ByteNodes Team",
      date: "2025-01-15",
      category: "Tutorial",
      readTime: "5 min read"
    };

    const demoComments: Comment[] = [
      {
        id: 1,
        author: "John Doe",
        date: "2025-01-16",
        content: "Great article! Very helpful for someone just starting with VPS hosting."
      },
      {
        id: 2,
        author: "Jane Smith",
        date: "2025-01-17",
        content: "Thanks for the detailed guide. The security tips are especially useful."
      }
    ];

    setPost(demoPost);
    setComments(demoComments);
    setLoading(false);
  }, [id]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !commentName.trim()) return;

    // TODO: Replace with your PHP backend API endpoint
    // fetch(`https://your-vps-domain.com/api/blog/posts/${id}/comments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: commentName, content: newComment })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setComments([...comments, data]);
    //     setNewComment("");
    //     setCommentName("");
    //   });

    // Demo: Add comment locally
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <Link to="/blog">
              <Button>Back to Blog</Button>
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
            ← Back to Blog
          </Link>

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
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmitComment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Comment</label>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    <Button type="submit">Post Comment</Button>
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
                        {new Date(comment.date).toLocaleDateString('en-US', { 
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