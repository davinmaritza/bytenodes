import { motion } from "framer-motion";
import fivemLogo from "@/assets/fivem-logo.png";
import minecraftLogo from "@/assets/minecraft-logo.png";
import rustLogo from "@/assets/rust-logo.png";
import terrariaLogo from "@/assets/terraria-logo.png";
import sampLogo from "@/assets/samp-logo.png";

export const GameSupportLogos = () => {
  const games = [
    { name: "FiveM", logo: fivemLogo },
    { name: "Minecraft", logo: minecraftLogo },
    { name: "Rust", logo: rustLogo },
    { name: "Terraria", logo: terrariaLogo },
    { name: "SA-MP", logo: sampLogo },
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
              className="flex items-center gap-3 px-5 py-3 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
            >
              <img 
                src={game.logo} 
                alt={game.name} 
                className="w-10 h-10 object-contain"
              />
              <span className="font-semibold text-sm">{game.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
