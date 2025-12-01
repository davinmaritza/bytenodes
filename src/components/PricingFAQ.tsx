import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is included in the hosting plans?",
    answer: "All our hosting plans include KVM virtualization, SSD storage, dedicated resources, free backups, DDoS protection, and 24/7 customer support. You'll have full root access and can install any software you need."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle. Downgrading will take effect at your next billing date."
  },
  {
    question: "What is your uptime guarantee?",
    answer: "We guarantee 99.9% uptime on all our hosting services. If we fail to meet this guarantee, you'll receive service credits according to our SLA policy. Our infrastructure is monitored 24/7 to ensure maximum reliability."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee on all new purchases. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund, no questions asked."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe for your protection."
  },
  {
    question: "How long does server setup take?",
    answer: "Most servers are provisioned automatically within 5-10 minutes after payment confirmation. Dedicated servers may take up to 24 hours for initial setup and configuration."
  },
  {
    question: "Do you provide technical support?",
    answer: "Absolutely! We offer 24/7 technical support via live chat, email, and support tickets. Our expert team is always ready to help with server configuration, troubleshooting, and optimization."
  },
  {
    question: "Can I host multiple websites on one server?",
    answer: "Yes, you can host as many websites as your server resources allow. All our plans come with full control over your server, allowing you to configure it however you need."
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees on any of our hosting plans. The price you see is what you pay - no hidden costs or surprise charges."
  },
  {
    question: "What security measures do you have in place?",
    answer: "We implement multiple security layers including DDoS protection, firewalls, regular security updates, SSL certificates, and automated backups. Your data is stored in secure data centers with 24/7 physical security."
  }
];

export const PricingFAQ = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our hosting services
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-cyan hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="text-cyan font-semibold hover:underline"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};