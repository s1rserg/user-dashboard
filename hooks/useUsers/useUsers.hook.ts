import { useState, useEffect, useMemo, useCallback } from 'react';
import { User } from './types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error loading data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerSearch) || u.email.toLowerCase().includes(lowerSearch),
    );
  }, [users, search]);

  return { users: filteredUsers, search, setSearch, loading, error, refetch: fetchUsers };
};
