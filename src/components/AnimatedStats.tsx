import { useEffect, useState } from "react";
import { Users, TrendingUp, Globe } from "lucide-react";

interface StatProps {
  end: number;
  duration?: number;
  suffix?: string;
  icon: React.ReactNode;
  label: string;
}

const AnimatedStat = ({ end, duration = 2000, suffix = "", icon, label }: StatProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in">
      <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
        {icon}
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-white/80 font-medium">{label}</div>
      </div>
    </div>
  );
};

export const AnimatedStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <AnimatedStat
        end={15000}
        suffix="+"
        icon={<Users className="w-6 h-6" />}
        label="Happy Customers"
      />
      <AnimatedStat
        end={99.9}
        suffix="%"
        icon={<TrendingUp className="w-6 h-6" />}
        label="Uptime Guarantee"
      />
      <AnimatedStat
        end={45}
        suffix="+"
        icon={<Globe className="w-6 h-6" />}
        label="Countries Served"
      />
    </div>
  );
};