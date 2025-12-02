import { Info, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-cyan/20 to-cyan-dark/20 border-b border-cyan/30 py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
        <Info className="w-4 h-4 text-cyan flex-shrink-0" />
        <p className="text-foreground/90">
          VPS KVM Hosting starting from only <span className="font-bold text-cyan">$3.99/month</span>!{" "}
          <Link to="/pricing" className="underline hover:text-cyan transition-colors">
            Learn More
          </Link>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto p-1 hover:bg-cyan/10 rounded transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>
      </div>
    </div>
  );
};
