import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { CreditCard, History, DollarSign } from "lucide-react";

interface Invoice {
  id: number;
  service: string;
  amount: string;
  status: string;
  date: string;
  dueDate: string;
}

const Payment = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Replace with your PHP backend API endpoint
    // fetch('https://your-vps-domain.com/api/invoices')
    //   .then(res => res.json())
    //   .then(data => setInvoices(data));

    // Demo data
    setInvoices([
      { id: 1, service: "VPS KVM - Premium", amount: "$29.99", status: "paid", date: "2025-01-01", dueDate: "2025-02-01" },
      { id: 2, service: "Domain Registration", amount: "$12.99", status: "pending", date: "2025-01-15", dueDate: "2025-01-30" },
      { id: 3, service: "Dedicated Server", amount: "$99.99", status: "paid", date: "2024-12-15", dueDate: "2025-01-15" }
    ]);
  }, []);

  const handleStripeCheckout = (invoiceId: number) => {
    setLoading(true);
    
    // TODO: Replace with your PHP backend API endpoint to create Stripe checkout session
    // fetch('https://your-vps-domain.com/api/stripe/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ invoiceId })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     // Redirect to Stripe Checkout
    //     window.location.href = data.checkoutUrl;
    //   })
    //   .catch(error => {
    //     console.error('Payment error:', error);
    //     setLoading(false);
    //   });

    // Demo: Simulate payment
    setTimeout(() => {
      alert('Connect this to your PHP Stripe integration. See API_INTEGRATION.md for details.');
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "paid" ? "default" : status === "pending" ? "secondary" : "destructive"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 bg-gradient-to-b from-navy-dark to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Payment & <span className="text-cyan">Billing</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Manage your invoices and payment methods securely
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="checkout" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="checkout">
                <CreditCard className="w-4 h-4 mr-2" />
                Checkout
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Checkout Tab */}
            <TabsContent value="checkout">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Stripe Checkout</CardTitle>
                    <CardDescription>Pay your pending invoices securely with Stripe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices
                        .filter(inv => inv.status === "pending")
                        .map((invoice) => (
                          <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="font-semibold">{invoice.service}</div>
                              <div className="text-sm text-muted-foreground">Due: {invoice.dueDate}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">{invoice.amount}</div>
                              <Button 
                                size="sm" 
                                onClick={() => handleStripeCheckout(invoice.id)}
                                disabled={loading}
                              >
                                {loading ? "Processing..." : "Pay Now"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      
                      {invoices.filter(inv => inv.status === "pending").length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No pending invoices
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Add Funds</CardTitle>
                    <CardDescription>Top up your account balance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                        <Input 
                          type="number" 
                          placeholder="50.00" 
                          min="10"
                          step="0.01"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" onClick={() => {}}>$25</Button>
                        <Button variant="outline" onClick={() => {}}>$50</Button>
                        <Button variant="outline" onClick={() => {}}>$100</Button>
                      </div>
                      <Button className="w-full" disabled={loading}>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Add Funds via Stripe
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Secure payment processing by Stripe
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>View all your past invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>#{invoice.id}</TableCell>
                          <TableCell className="font-medium">{invoice.service}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">View</Button>
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
      </section>

      <Footer />
    </div>
  );
};

export default Payment;