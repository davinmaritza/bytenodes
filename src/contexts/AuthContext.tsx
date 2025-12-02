import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  balance: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local Storage Keys
const USERS_KEY = 'bytenodes_users';
const AUTH_KEY = 'bytenodes_auth';

// Get users from localStorage
const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    // Initialize with admin user
    const defaultUsers = [{
      id: 1,
      name: 'Admin',
      email: 'admin@bytenodes.id',
      password: 'admin123',
      role: 'admin' as const,
      balance: 0,
      createdAt: new Date().toISOString()
    }];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(users);
};

// Save users to localStorage
const saveUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem(AUTH_KEY);
      if (authData) {
        try {
          const { userId, expiry } = JSON.parse(authData);
          if (expiry > Date.now()) {
            const users = getUsers();
            const foundUser = users.find((u: any) => u.id === userId);
            if (foundUser) {
              setUser({
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role || 'user',
                balance: foundUser.balance || 0
              });
            }
          } else {
            localStorage.removeItem(AUTH_KEY);
          }
        } catch (error) {
          localStorage.removeItem(AUTH_KEY);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      toast.error('Email atau password salah');
      throw new Error('Invalid credentials');
    }
    
    // Save auth session
    const authData = {
      userId: foundUser.id,
      expiry: Date.now() + 86400000 // 24 hours
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    
    setUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role || 'user',
      balance: foundUser.balance || 0
    });
    
    toast.success('Login berhasil!');
    
    // Redirect based on role
    if (foundUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/client/dashboard');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const users = getUsers();
    
    // Check if email already exists
    if (users.find((u: any) => u.email === email)) {
      toast.error('Email sudah terdaftar');
      throw new Error('Email already registered');
    }
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role: 'user' as const,
      balance: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    toast.success('Registrasi berhasil! Silakan login.');
    navigate('/client/login');
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    toast.success('Logout berhasil');
    navigate('/client/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
