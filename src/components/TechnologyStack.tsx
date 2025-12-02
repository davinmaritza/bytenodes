import samsungLogo from "@/assets/samsung-logo.png";
import asrockLogo from "@/assets/asrock-logo.png";
import ovhLogo from "@/assets/ovh-logo.png";

const technologies = [
  {
    name: "Proxmox",
    logo: "https://www.proxmox.com/images/proxmox/Proxmox-logo-860.png"
  },
  {
    name: "Ubuntu",
    logo: "https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png"
  },
  {
    name: "Intel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg"
  },
  {
    name: "AMD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg"
  },
  {
    name: "Samsung",
    logo: samsungLogo
  },
  {
    name: "ASRock",
    logo: asrockLogo
  },
  {
    name: "Cloudflare",
    logo: "https://www.cloudflare.com/img/logo-cloudflare-dark.svg"
  },
  {
    name: "OVH",
    logo: ovhLogo
  }
];

export const TechnologyStack = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20 border-y border-border">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Powered by Industry Leaders
          </h2>
          <p className="text-foreground/60 text-base">
            We use the best technology stack to ensure top-tier performance and reliability
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center max-w-7xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-card rounded-lg border border-border hover:shadow-md hover:shadow-cyan/5 transition-all hover:scale-105 group"
            >
              <img
                src={tech.logo}
                alt={tech.name}
                className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-sm font-semibold text-foreground/60">${tech.name}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-foreground/50">
            Enterprise-grade infrastructure trusted by thousands of businesses worldwide
          </p>
        </div>
      </div>
    </section>
  );
};