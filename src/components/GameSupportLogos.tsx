import { motion } from "framer-motion";

export const GameSupportLogos = () => {
  const games = [
    { name: "FiveM", color: "#F97316" },
    { name: "Minecraft", color: "#62B47A" },
    { name: "Rust", color: "#CE422B" },
    { name: "Terraria", color: "#14B8A6" },
    { name: "SA-MP", color: "#F59E0B" },
  ];

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-bold mb-2">Supported Games</h3>
          <p className="text-sm text-muted-foreground">Our servers support all popular game platforms</p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div 
                className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: game.color }}
              >
                {game.name.charAt(0)}
              </div>
              <span className="font-semibold text-sm">{game.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};