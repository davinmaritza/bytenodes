import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your PHP backend API endpoint
    // fetch('https://your-vps-domain.com/api/blog/posts')
    //   .then(res => res.json())
    //   .then(data => {
    //     setPosts(data);
    //     setLoading(false);
    //   });

    // Demo data for now
    const demoData: BlogPost[] = [
      {
        id: 1,
        title: "Getting Started with VPS Hosting",
        excerpt: "Learn the basics of VPS hosting and how to set up your first virtual private server.",
        content: "",
        author: "ByteNodes Team",
        date: "2025-01-15",
        category: "Tutorial"
      },
      {
        id: 2,
        title: "How to Secure Your Dedicated Server",
        excerpt: "Essential security practices to protect your dedicated hosting infrastructure.",
        content: "",
        author: "ByteNodes Team",
        date: "2025-01-10",
        category: "Security"
      },
      {
        id: 3,
        title: "Domain Management Best Practices",
        excerpt: "Tips and tricks for managing your domains effectively and avoiding common pitfalls.",
        content: "",
        author: "ByteNodes Team",
        date: "2025-01-05",
        category: "Guide"
      }
    ];
    
    setPosts(demoData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Knowledge <span className="text-gradient">Base</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tutorials, guides, and articles to help you get the most out of your hosting
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading articles...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-cyan hover:text-cyan-light"
                      onClick={() => {
                        window.location.href = `/blog/${post.id}`;
                      }}
                    >
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
