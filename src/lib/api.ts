// API Service Layer for PHP/MySQL Backend

// Base API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getAuthToken = () => localStorage.getItem('authToken');

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Authentication API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

// Services/Servers API
export const servicesApi = {
  getUserServices: async () => {
    const response = await fetch(`${API_URL}/services`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  getAvailableProducts: async () => {
    const response = await fetch(`${API_URL}/products`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  createOrder: async (productId: number, billingCycle: string) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id: productId, billing_cycle: billingCycle }),
    });
    return handleResponse(response);
  },
};

// Tickets API
export const ticketsApi = {
  getTickets: async () => {
    const response = await fetch(`${API_URL}/tickets`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  createTicket: async (subject: string, priority: string, message: string) => {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject, priority, message }),
    });
    return handleResponse(response);
  },

  getTicketReplies: async (ticketId: number) => {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/replies`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  replyToTicket: async (ticketId: number, message: string) => {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/replies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    return handleResponse(response);
  },
};

// Payment API
export const paymentApi = {
  createPaymentIntent: async (amount: number, orderId?: number) => {
    const response = await fetch(`${API_URL}/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, order_id: orderId }),
    });
    return handleResponse(response);
  },

  getInvoices: async () => {
    const response = await fetch(`${API_URL}/invoices`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

// Blog API
export const blogApi = {
  getPosts: async () => {
    const response = await fetch(`${API_URL}/blog/posts`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },

  getPost: async (id: number) => {
    const response = await fetch(`${API_URL}/blog/posts/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
  },
};

// Admin API
export const adminApi = {
  getAllTickets: async () => {
    const response = await fetch(`${API_URL}/admin/tickets`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  getAllOrders: async () => {
    const response = await fetch(`${API_URL}/admin/orders`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  createBlogPost: async (title: string, category: string, content: string, status: string) => {
    const response = await fetch(`${API_URL}/admin/blog/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, category, content, status }),
    });
    return handleResponse(response);
  },

  updateBlogPost: async (id: number, data: any) => {
    const response = await fetch(`${API_URL}/admin/blog/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteBlogPost: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/blog/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};
