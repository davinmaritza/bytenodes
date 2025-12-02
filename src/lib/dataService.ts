import productsData from '@/data/products.json';
import blogsData from '@/data/blogs.json';
import menuData from '@/data/menu.json';

// Types
export interface ServerProduct {
  id: number;
  name: string;
  category: string;
  cpu: string;
  ram: string;
  storage: string;
  price: number;
  features: string[];
}

export interface VPSProduct {
  id: number;
  name: string;
  category: string;
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  price: number;
  features: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  createdAt: string;
  published: boolean;
}

export interface MenuItem {
  label: string;
  href: string;
  description?: string;
  children?: MenuItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

// Products Service
export const getServerProducts = (): ServerProduct[] => {
  return productsData.servers;
};

export const getServerProductsByCategory = (category: string): ServerProduct[] => {
  return productsData.servers.filter(p => p.category === category);
};

export const getServerCategories = (): string[] => {
  return [...new Set(productsData.servers.map(p => p.category))];
};

export const getVPSProducts = (): VPSProduct[] => {
  return productsData.vps;
};

export const getVPSProductsByCategory = (category: string): VPSProduct[] => {
  return productsData.vps.filter(p => p.category === category);
};

export const getVPSCategories = (): string[] => {
  return [...new Set(productsData.vps.map(p => p.category))];
};

// Blog Service
export const getBlogPosts = (): BlogPost[] => {
  return blogsData.posts.filter(p => p.published);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogsData.posts.find(p => p.slug === slug && p.published);
};

export const getBlogPostById = (id: number): BlogPost | undefined => {
  return blogsData.posts.find(p => p.id === id && p.published);
};

export const getBlogCategories = (): string[] => {
  return [...new Set(blogsData.posts.filter(p => p.published).map(p => p.category))];
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogsData.posts.filter(p => p.category === category && p.published);
};

// Menu Service
export const getMainNav = (): MenuItem[] => {
  return menuData.mainNav;
};

export const getFooterNav = () => {
  return menuData.footerNav;
};

export const getSocialLinks = (): SocialLink[] => {
  return menuData.socialLinks;
};

// Format price to Indonesian Rupiah
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
