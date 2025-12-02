// Simple API Service Layer using Local Storage
// This provides mock functionality until a real backend is implemented

// Utility functions
const getAuthToken = () => localStorage.getItem('authToken');
const setAuthToken = (token: string) => localStorage.setItem('authToken', token);
const removeAuthToken = () => localStorage.removeItem('authToken');

// User storage key
const USERS_KEY = 'bytenodes_users';
const TICKETS_KEY = 'bytenodes_tickets';

// Get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get tickets from localStorage
const getTickets = () => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

// Save tickets to localStorage
const saveTickets = (tickets: any[]) => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

// Generate simple token
const generateToken = (userId: number) => {
  return btoa(JSON.stringify({ id: userId, exp: Date.now() + 86400000 }));
};

// Decode token
const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

// Authentication API (uses localStorage)
export const authApi = {
  login: async (email: string, password: string) => {
    const users = getUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const token = generateToken(user.id);
    setAuthToken(token);
    
    return { 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role || 'user',
        balance: user.balance || 0 
      } 
    };
  },

  register: async (name: string, email: string, password: string) => {
    const users = getUsers();
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role: 'user',
      balance: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { message: 'Registration successful' };
  },

  getMe: async () => {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');
    
    const decoded = decodeToken(token);
    if (!decoded || decoded.exp < Date.now()) {
      removeAuthToken();
      throw new Error('Token expired');
    }
    
    const users = getUsers();
    const user = users.find((u: any) => u.id === decoded.id);
    
    if (!user) throw new Error('User not found');
    
    return { 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role || 'user',
        balance: user.balance || 0 
      } 
    };
  },

  logout: () => {
    removeAuthToken();
  }
};

// Tickets API (uses localStorage)
export const ticketsApi = {
  getTickets: async () => {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');
    
    const decoded = decodeToken(token);
    const tickets = getTickets();
    
    // Return user's tickets only (unless admin)
    const users = getUsers();
    const user = users.find((u: any) => u.id === decoded.id);
    
    if (user?.role === 'admin') {
      return { tickets };
    }
    
    return { tickets: tickets.filter((t: any) => t.userId === decoded.id) };
  },

  createTicket: async (subject: string, priority: string, message: string) => {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');
    
    const decoded = decodeToken(token);
    const tickets = getTickets();
    
    const newTicket = {
      id: tickets.length + 1,
      userId: decoded.id,
      subject,
      priority,
      status: 'open',
      messages: [{ 
        id: 1, 
        userId: decoded.id, 
        message, 
        createdAt: new Date().toISOString() 
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tickets.push(newTicket);
    saveTickets(tickets);
    
    return { ticket: newTicket };
  },

  getTicketReplies: async (ticketId: number) => {
    const tickets = getTickets();
    const ticket = tickets.find((t: any) => t.id === ticketId);
    
    if (!ticket) throw new Error('Ticket not found');
    
    return { replies: ticket.messages || [] };
  },

  replyToTicket: async (ticketId: number, message: string) => {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');
    
    const decoded = decodeToken(token);
    const tickets = getTickets();
    const ticketIndex = tickets.findIndex((t: any) => t.id === ticketId);
    
    if (ticketIndex === -1) throw new Error('Ticket not found');
    
    const newReply = {
      id: (tickets[ticketIndex].messages?.length || 0) + 1,
      userId: decoded.id,
      message,
      createdAt: new Date().toISOString()
    };
    
    tickets[ticketIndex].messages = [...(tickets[ticketIndex].messages || []), newReply];
    tickets[ticketIndex].updatedAt = new Date().toISOString();
    saveTickets(tickets);
    
    return { reply: newReply };
  },
};

// Initialize with demo admin user if no users exist
if (getUsers().length === 0) {
  saveUsers([{
    id: 1,
    name: 'Admin',
    email: 'admin@bytenodes.id',
    password: 'admin123',
    role: 'admin',
    balance: 0,
    createdAt: new Date().toISOString()
  }]);
}
