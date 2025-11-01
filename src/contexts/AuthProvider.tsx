import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (provider: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const login = async (provider: string) => {
    // Stub: Simulate OAuth login
    console.log(`Logging in with ${provider}...`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsAuthenticated(true);
    setUser({
      email: `user@${provider}.com`,
      name: `${provider} User`
    });
  };

  const loginWithEmail = async (email: string, password: string) => {
    // Stub: Simulate email/password login
    console.log('Logging in with email...', email);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsAuthenticated(true);
    setUser({
      email,
      name: email.split('@')[0]
    });
  };

  const signup = async (email: string, password: string) => {
    // Stub: Simulate signup
    console.log('Signing up...', email);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsAuthenticated(true);
    setUser({
      email,
      name: email.split('@')[0]
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithEmail, signup, logout }}>
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
