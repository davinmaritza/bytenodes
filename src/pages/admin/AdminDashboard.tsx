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
import { Ticket, FileText, ShoppingCart, Plus, Eye, MessageSquare, Users, Trash2, Edit, Server } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  balance: number;
  createdAt: string;
  services?: Service[];
}

interface Service {
  id: string;
  name: string;
  type: string;
  status: string;
  ip: string;
  sshPort?: string;
  expires: string;
}

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

const USERS_KEY = 'bytenodes_users';

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Add service dialog
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newService, setNewService] = useState({
    name: '',
    type: 'VPS KVM',
    ip: '',
    sshPort: '22',
    expires: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem(USERS_KEY);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    // Load tickets from localStorage
    const storedTickets = localStorage.getItem('bytenodes_tickets');
    if (storedTickets) {
      const ticketsData = JSON.parse(storedTickets);
      setTickets(ticketsData.map((t: any) => ({
        id: t.id,
        subject: t.subject,
        status: t.status,
        priority: t.priority,
        customer: t.userName || 'Unknown',
        created: t.createdAt?.split('T')[0] || 'N/A'
      })));
    }

    // Demo blog posts
    setBlogPosts([
      { id: 1, title: "Getting Started with VPS", category: "Tutorial", status: "published", author: "Admin", created: "2025-01-15" },
      { id: 2, title: "Security Best Practices", category: "Security", status: "draft", author: "Admin", created: "2025-01-14" }
    ]);

    setLoading(false);
  };

  const saveUsers = (updatedUsers: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const addServiceToUser = (userId: number) => {
    if (!newService.name || !newService.ip || !newService.expires) {
      toast.error('Please fill all required fields');
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const services = user.services || [];
        return {
          ...user,
          services: [...services, {
            id: `srv-${Date.now()}`,
            name: newService.name,
            type: newService.type,
            status: 'Active',
            ip: newService.ip,
            sshPort: newService.sshPort,
            expires: newService.expires
          }]
        };
      }
      return user;
    });

    saveUsers(updatedUsers);
    setNewService({ name: '', type: 'VPS KVM', ip: '', sshPort: '22', expires: '' });
    setSelectedUser(null);
    toast.success('Service added successfully');
  };

  const removeService = (userId: number, serviceId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          services: (user.services || []).filter(s => s.id !== serviceId)
        };
      }
      return user;
    });
    saveUsers(updatedUsers);
    toast.success('Service removed');
  };

  const deleteUser = (userId: number) => {
    if (userId === 1) {
      toast.error('Cannot delete admin user');
      return;
    }
    const updatedUsers = users.filter(u => u.id !== userId);
    saveUsers(updatedUsers);
    toast.success('User deleted');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      open: "destructive",
      pending: "secondary",
      closed: "default",
      published: "default",
      draft: "secondary",
      Active: "default",
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
            <p className="text-muted-foreground">Manage users, tickets, and blog posts</p>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
              <TabsTrigger value="users">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="tickets">
                <Ticket className="w-4 h-4 mr-2" />
                Tickets
              </TabsTrigger>
              <TabsTrigger value="blog">
                <FileText className="w-4 h-4 mr-2" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage registered users and their services</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono">#{user.id}</TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{(user.services || []).length}</TableCell>
                          <TableCell>Rp {user.balance?.toLocaleString() || 0}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                                    <Server className="w-4 h-4 mr-1" />
                                    Services
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Services for {user.name}</DialogTitle>
                                    <DialogDescription>User ID: #{user.id}</DialogDescription>
                                  </DialogHeader>
                                  
                                  {/* Current Services */}
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Current Services</h4>
                                    {(user.services || []).length === 0 ? (
                                      <p className="text-muted-foreground text-sm">No services assigned</p>
                                    ) : (
                                      <div className="space-y-2">
                                        {(user.services || []).map((service) => (
                                          <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                              <p className="font-medium">{service.name}</p>
                                              <p className="text-sm text-muted-foreground">
                                                {service.type} | IP: {service.ip}:{service.sshPort} | Expires: {service.expires}
                                              </p>
                                            </div>
                                            <Button 
                                              size="sm" 
                                              variant="destructive"
                                              onClick={() => removeService(user.id, service.id)}
                                            >
                                              <Trash2 className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    
                                    {/* Add New Service */}
                                    <div className="border-t pt-4 mt-4">
                                      <h4 className="font-semibold mb-4">Add New Service</h4>
                                      <div className="grid grid-cols-2 gap-4">
                                        <Input 
                                          placeholder="Service Name (e.g. VPS Server - US East)"
                                          value={newService.name}
                                          onChange={(e) => setNewService({...newService, name: e.target.value})}
                                        />
                                        <Select 
                                          value={newService.type}
                                          onValueChange={(v) => setNewService({...newService, type: v})}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="VPS KVM">VPS KVM</SelectItem>
                                            <SelectItem value="Dedicated">Dedicated</SelectItem>
                                            <SelectItem value="RDP Windows">RDP Windows</SelectItem>
                                            <SelectItem value="Game Server">Game Server</SelectItem>
                                            <SelectItem value="Discord Bot">Discord Bot</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <Input 
                                          placeholder="IP Address"
                                          value={newService.ip}
                                          onChange={(e) => setNewService({...newService, ip: e.target.value})}
                                        />
                                        <Input 
                                          placeholder="SSH/RDP Port"
                                          value={newService.sshPort}
                                          onChange={(e) => setNewService({...newService, sshPort: e.target.value})}
                                        />
                                        <Input 
                                          type="date"
                                          placeholder="Expiry Date"
                                          value={newService.expires}
                                          onChange={(e) => setNewService({...newService, expires: e.target.value})}
                                        />
                                        <Button onClick={() => addServiceToUser(user.id)}>
                                          <Plus className="w-4 h-4 mr-2" />
                                          Add Service
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              {user.role !== 'admin' && (
                                <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <CardTitle>Support Tickets</CardTitle>
                  <CardDescription>Manage customer support tickets</CardDescription>
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
                      {tickets.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            No tickets found
                          </TableCell>
                        </TableRow>
                      ) : (
                        tickets.map((ticket) => (
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
                        ))
                      )}
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
                            <Textarea placeholder="Post content..." className="min-h-[200px]" />
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
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
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

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Orders</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Orders are processed via Discord. Visit{" "}
                    <a href="https://discord.gg/2PMmPp6Yx8" target="_blank" className="text-primary hover:underline">
                      discord.gg/2PMmPp6Yx8
                    </a>
                  </p>
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