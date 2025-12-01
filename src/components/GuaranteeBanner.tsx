import { Shield, CheckCircle, Clock } from "lucide-react";

export const GuaranteeBanner = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-cyan/10 via-navy/5 to-cyan/10 border-y border-border">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-cyan" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Risk-Free <span className="text-gradient">30-Day</span> Money-Back Guarantee
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try ByteNodes with complete confidence. If you're not 100% satisfied, we'll refund your money—no questions asked.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">No Questions Asked</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Don't like our service? Get a full refund within 30 days. We trust you to decide if we're right for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Quick Processing</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Request a refund anytime within your first 30 days. We process refunds within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Your Data Protected</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get a full backup of your data before cancellation. Your information stays safe and secure with us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions about our guarantee? <a href="/contact" className="text-cyan font-semibold hover:underline">Contact our team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};