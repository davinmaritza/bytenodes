import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  replies?: TicketReply[];
}

interface TicketReply {
  id: number;
  ticket_id: number;
  message: string;
  is_admin: boolean;
  created_at: string;
}

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  useEffect(() => {
    // TODO: Replace with your PHP backend API endpoint
    // fetch('https://your-vps-domain.com/api/tickets', {
    //   headers: {
    //     'Authorization': 'Bearer YOUR_TOKEN'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setTickets(data);
    //     setLoading(false);
    //   });

    // Demo data for now
    const demoData: Ticket[] = [
      {
        id: 1,
        subject: "Server not responding",
        message: "My VPS server is not responding for the last 2 hours",
        status: "open",
        priority: "high",
        created_at: "2025-01-20T10:30:00Z",
        updated_at: "2025-01-20T10:30:00Z"
      },
      {
        id: 2,
        subject: "Domain DNS configuration help",
        message: "Need help configuring DNS records for my new domain",
        status: "in-progress",
        priority: "medium",
        created_at: "2025-01-19T14:20:00Z",
        updated_at: "2025-01-20T09:15:00Z"
      }
    ];
    
    setTickets(demoData);
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with your PHP backend API endpoint
    // fetch('https://your-vps-domain.com/api/tickets', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_TOKEN'
    //   },
    //   body: JSON.stringify(formData)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setTickets([data, ...tickets]);
    //     setFormData({ subject: '', message: '', priority: 'medium' });
    //     setShowCreateForm(false);
    //   });

    alert('Connect this to your PHP backend API to create ticket');
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive", icon: any }> = {
      open: { variant: "default", icon: Clock },
      "in-progress": { variant: "secondary", icon: MessageSquare },
      closed: { variant: "destructive", icon: CheckCircle }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-blue-500/10 text-blue-500",
      medium: "bg-yellow-500/10 text-yellow-500",
      high: "bg-red-500/10 text-red-500"
    };
    
    return (
      <Badge className={colors[priority]}>
        {priority}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Support <span className="text-gradient">Tickets</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Create and track your support requests
              </p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="gradient-cyan-navy glow-cyan"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {showCreateForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create New Ticket</CardTitle>
                <CardDescription>
                  Describe your issue and our team will respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select 
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger className="mt-2">
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Provide detailed information about your issue"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="gradient-cyan-navy">
                      Submit Ticket
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            
            {['all', 'open', 'in-progress', 'closed'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                {loading ? (
                  <div className="text-center text-muted-foreground">Loading tickets...</div>
                ) : (
                  <div className="space-y-4">
                    {tickets
                      .filter(ticket => tab === 'all' || ticket.status === tab)
                      .map((ticket) => (
                        <Card 
                          key={ticket.id} 
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-xl mb-2">
                                  #{ticket.id} - {ticket.subject}
                                </CardTitle>
                                <div className="flex gap-2 mb-2">
                                  {getStatusBadge(ticket.status)}
                                  {getPriorityBadge(ticket.priority)}
                                </div>
                              </div>
                            </div>
                            <CardDescription className="text-sm">
                              Created: {new Date(ticket.created_at).toLocaleString()} | 
                              Updated: {new Date(ticket.updated_at).toLocaleString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-2">
                              {ticket.message}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    
                    {tickets.filter(ticket => tab === 'all' || ticket.status === tab).length === 0 && (
                      <Card className="p-8 text-center">
                        <XCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No tickets found</p>
                      </Card>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
