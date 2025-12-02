import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MessageSquare, Clock, Send, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Message {
  id: number;
  userId: number;
  userName: string;
  message: string;
  createdAt: string;
  isStaff: boolean;
}

interface Ticket {
  id: number;
  userId: number;
  subject: string;
  priority: string;
  status: string;
  category: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const TICKETS_KEY = 'bytenodes_tickets';

const getTickets = (): Ticket[] => {
  const data = localStorage.getItem(TICKETS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveTickets = (tickets: Ticket[]) => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "General",
    priority: "medium",
    message: ""
  });

  useEffect(() => {
    loadTickets();
  }, [user]);

  const loadTickets = () => {
    const allTickets = getTickets();
    const userTickets = user ? allTickets.filter(t => t.userId === user.id) : [];
    setTickets(userTickets);
  };

  const handleCreateTicket = () => {
    if (!user || !newTicket.subject || !newTicket.message) {
      toast.error("Mohon isi semua field");
      return;
    }

    const allTickets = getTickets();
    const ticket: Ticket = {
      id: allTickets.length + 1,
      userId: user.id,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: newTicket.priority,
      status: "open",
      messages: [{
        id: 1,
        userId: user.id,
        userName: user.name,
        message: newTicket.message,
        createdAt: new Date().toISOString(),
        isStaff: false
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    allTickets.push(ticket);
    saveTickets(allTickets);
    loadTickets();
    
    setNewTicket({ subject: "", category: "General", priority: "medium", message: "" });
    setIsCreateOpen(false);
    toast.success("Ticket berhasil dibuat!");
  };

  const handleSendReply = () => {
    if (!user || !selectedTicket || !newMessage.trim()) return;

    const allTickets = getTickets();
    const ticketIndex = allTickets.findIndex(t => t.id === selectedTicket.id);
    
    if (ticketIndex === -1) return;

    const newMsg: Message = {
      id: allTickets[ticketIndex].messages.length + 1,
      userId: user.id,
      userName: user.name,
      message: newMessage,
      createdAt: new Date().toISOString(),
      isStaff: false
    };

    allTickets[ticketIndex].messages.push(newMsg);
    allTickets[ticketIndex].updatedAt = new Date().toISOString();
    
    saveTickets(allTickets);
    setSelectedTicket(allTickets[ticketIndex]);
    loadTickets();
    setNewMessage("");
    toast.success("Pesan terkirim!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-500/20 text-green-500";
      case "in_progress": return "bg-yellow-500/20 text-yellow-500";
      case "closed": return "bg-gray-500/20 text-gray-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-500";
      case "medium": return "bg-yellow-500/20 text-yellow-500";
      case "low": return "bg-blue-500/20 text-blue-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Support <span className="text-gradient">Tickets</span>
              </h1>
              <p className="text-muted-foreground">Butuh bantuan? Buat ticket dan tim kami akan membantu Anda.</p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Buat Ticket Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Buat Ticket Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      placeholder="Masukkan subject ticket"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Kategori</label>
                      <Select value={newTicket.category} onValueChange={(v) => setNewTicket({ ...newTicket, category: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Billing">Billing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Priority</label>
                      <Select value={newTicket.priority} onValueChange={(v) => setNewTicket({ ...newTicket, priority: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Pesan</label>
                    <Textarea
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                      placeholder="Jelaskan masalah atau pertanyaan Anda..."
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleCreateTicket} className="w-full">
                    Kirim Ticket
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ticket List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Ticket Saya ({tickets.length})</h2>
              {tickets.length === 0 ? (
                <Card className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada ticket</p>
                </Card>
              ) : (
                tickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    className={`cursor-pointer transition-all hover:border-primary ${
                      selectedTicket?.id === ticket.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold line-clamp-1">{ticket.subject}</h3>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{ticket.category}</Badge>
                        <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(ticket.updatedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Ticket Detail */}
            <div className="lg:col-span-2">
              {selectedTicket ? (
                <Card className="h-full flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{selectedTicket.subject}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{selectedTicket.category}</Badge>
                          <Badge className={getPriorityColor(selectedTicket.priority)}>
                            {selectedTicket.priority}
                          </Badge>
                          <Badge className={getStatusColor(selectedTicket.status)}>
                            {selectedTicket.status}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        #{selectedTicket.id}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                      {selectedTicket.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.isStaff ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className={`max-w-[80%] ${msg.isStaff ? 'order-2' : 'order-1'}`}>
                            <div className={`rounded-lg p-3 ${
                              msg.isStaff 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'bg-secondary'
                            }`}>
                              <div className="flex items-center gap-2 mb-1">
                                <User className="w-3 h-3" />
                                <span className="text-sm font-medium">{msg.userName}</span>
                                {msg.isStaff && (
                                  <Badge variant="outline" className="text-xs">Staff</Badge>
                                )}
                              </div>
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(msg.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Input */}
                    {selectedTicket.status !== 'closed' && (
                      <div className="border-t p-4">
                        <div className="flex gap-2">
                          <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Ketik balasan..."
                            rows={2}
                            className="flex-1"
                          />
                          <Button onClick={handleSendReply} className="self-end">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Pilih ticket untuk melihat detail</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tickets;
