import { useState, useEffect, useMemo } from 'react';
import { User } from './types';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lowerSearch) || u.email.toLowerCase().includes(lowerSearch),
    );
  }, [users, search]);

  return { users: filteredUsers, search, setSearch, loading, error };
};
