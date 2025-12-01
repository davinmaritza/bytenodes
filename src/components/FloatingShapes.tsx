export const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float-delayed"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-navy-light/20 rounded-full blur-2xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-cyan/15 rounded-full blur-xl animate-float"></div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-white/10 rotate-45 animate-spin-slow"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-cyan/20 rotate-12 animate-float-delayed"></div>
      <div className="absolute bottom-1/3 right-1/2 w-12 h-12 bg-gradient-to-br from-white/5 to-cyan/10 rounded-lg rotate-45 animate-float-slow"></div>
      
      {/* Dots pattern */}
      <div className="absolute top-10 right-10 grid grid-cols-3 gap-2 opacity-20">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>

      {/* Lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeWidth="1" className="text-cyan animate-pulse" />
        <line x1="100%" y1="30%" x2="80%" y2="30%" stroke="currentColor" strokeWidth="1" className="text-white animate-pulse" />
        <line x1="20%" y1="80%" x2="40%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-cyan animate-pulse" />
      </svg>
    </div>
  );
};