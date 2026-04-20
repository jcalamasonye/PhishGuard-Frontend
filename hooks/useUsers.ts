import { useState, useCallback } from 'react';
import { User } from '@/types/user';
import { MOCK_USERS } from '@/lib/mock-data';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  refreshUsers: () => void;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addUser = useCallback((newUser: Omit<User, 'id'>) => {
    const user: User = {
      ...newUser,
      id: `user-${Date.now()}`
    };
    setUsers(prev => [...prev, user]);
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...updates } : user
      )
    );
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  const getUserById = useCallback((id: string) => {
    return users.find(user => user.id === id);
  }, [users]);

  const refreshUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    
    
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 500);
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    refreshUsers
  };
}