import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getBlogPosts, BlogPost as BlogPostType } from "@/lib/dataService";

const Blog = () => {
  const posts = getBlogPosts();

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
                {post.image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { 
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
                  <Link to={`/blog/${post.slug}`}>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-cyan hover:text-cyan-light"
                    >
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
