import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Ticket, FileText, ShoppingCart, Plus, Eye, MessageSquare } from "lucide-react";

interface TicketItem {
  id: number;
  subject: string;
  status: string;
  priority: string;
  customer: string;
  created: string;
}

interface BlogPostItem {
  id: number;
  title: string;
  category: string;
  status: string;
  author: string;
  created: string;
}

interface Order {
  id: number;
  customer: string;
  product: string;
  amount: string;
  status: string;
  date: string;
}

const AdminDashboard = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your PHP backend API endpoint
    // fetch('https://your-vps-domain.com/api/admin/tickets')
    //   .then(res => res.json())
    //   .then(data => setTickets(data));

    // Demo data
    setTickets([
      { id: 1, subject: "Server downtime issue", status: "open", priority: "high", customer: "John Doe", created: "2025-01-15" },
      { id: 2, subject: "Billing question", status: "pending", priority: "medium", customer: "Jane Smith", created: "2025-01-14" },
      { id: 3, subject: "Domain transfer", status: "closed", priority: "low", customer: "Bob Johnson", created: "2025-01-13" }
    ]);

    setBlogPosts([
      { id: 1, title: "Getting Started with VPS", category: "Tutorial", status: "published", author: "Admin", created: "2025-01-15" },
      { id: 2, title: "Security Best Practices", category: "Security", status: "draft", author: "Admin", created: "2025-01-14" }
    ]);

    setOrders([
      { id: 1, customer: "John Doe", product: "VPS KVM", amount: "$29.99", status: "paid", date: "2025-01-15" },
      { id: 2, customer: "Jane Smith", product: "Dedicated Server", amount: "$99.99", status: "pending", date: "2025-01-14" }
    ]);

    setLoading(false);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      open: "destructive",
      pending: "secondary",
      closed: "default",
      published: "default",
      draft: "secondary",
      paid: "default",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage tickets, blog posts, and customer orders</p>
          </div>

          <Tabs defaultValue="tickets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="tickets">
                <Ticket className="w-4 h-4 mr-2" />
                Tickets
              </TabsTrigger>
              <TabsTrigger value="blog">
                <FileText className="w-4 h-4 mr-2" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
            </TabsList>

            {/* Tickets Tab */}
            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Support Tickets</CardTitle>
                      <CardDescription>Manage customer support tickets</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Ticket</DialogTitle>
                          <DialogDescription>Create a ticket on behalf of a customer</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Customer Email</label>
                            <Input placeholder="customer@example.com" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <Input placeholder="Ticket subject" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Priority</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <Textarea placeholder="Ticket details..." />
                          </div>
                          <Button className="w-full">Create Ticket</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell>#{ticket.id}</TableCell>
                          <TableCell className="font-medium">{ticket.subject}</TableCell>
                          <TableCell>{ticket.customer}</TableCell>
                          <TableCell>
                            <Badge variant={ticket.priority === "high" ? "destructive" : "secondary"}>
                              {ticket.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                          <TableCell>{ticket.created}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blog Posts Tab */}
            <TabsContent value="blog">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Blog Posts</CardTitle>
                      <CardDescription>Manage blog articles and tutorials</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          New Post
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Create New Blog Post</DialogTitle>
                          <DialogDescription>Write a new article or tutorial</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <Input placeholder="Post title" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tutorial">Tutorial</SelectItem>
                                <SelectItem value="security">Security</SelectItem>
                                <SelectItem value="guide">Guide</SelectItem>
                                <SelectItem value="news">News</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <Textarea placeholder="Post content (HTML supported)..." className="min-h-[200px]" />
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">Save as Draft</Button>
                            <Button className="flex-1">Publish</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>#{post.id}</TableCell>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{getStatusBadge(post.status)}</TableCell>
                          <TableCell>{post.created}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="outline">Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Orders</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>#{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="font-medium">{order.product}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;