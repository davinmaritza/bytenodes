import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStartup Inc",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "ByteNodes has been exceptional for our hosting needs. Their VPS performance is outstanding and support team is always responsive."
  },
  {
    name: "Michael Chen",
    role: "Lead Developer, WebSolutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Switched from another provider and couldn't be happier. The server uptime is incredible and the dashboard is so easy to use."
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director, GrowthCo",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "Best hosting service I've used. The dedicated servers are blazing fast and their customer support goes above and beyond."
  },
  {
    name: "David Kim",
    role: "Game Server Owner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Running multiple game servers here. Zero lag, great performance, and the team helped me set everything up perfectly."
  },
  {
    name: "Lisa Martinez",
    role: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    rating: 5,
    text: "ByteNodes makes it easy to manage my client websites. Affordable pricing and reliable service - highly recommended!"
  },
  {
    name: "James Wilson",
    role: "E-commerce Store Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "My online store has never run smoother. Fast load times, excellent uptime, and their backup system gives me peace of mind."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Trusted by Thousands of Customers
          </h2>
          <p className="text-base text-foreground/60 max-w-2xl mx-auto">
            See what our customers have to say about their experience with ByteNodes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg hover:shadow-cyan/5 transition-all bg-card border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan text-cyan" />
                ))}
              </div>
              
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-foreground/60 text-sm">
            <Star className="w-5 h-5 fill-cyan text-cyan" />
            <span className="font-semibold text-foreground">4.9/5</span>
            <span>based on 2,500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};