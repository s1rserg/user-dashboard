'use client';

import { useState, useEffect } from 'react';
import { useDebounce, useUsers } from '@/hooks';
import { SearchInput } from '@/components/shared';

export const Dashboard = () => {
  const { users, setSearch, loading, error } = useUsers();

  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <SearchInput value={inputValue} onChange={setInputValue} />
      <ul>
        {users.map((u) => (
          <li
            key={u.id}
            style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}
          >
            <strong>{u.name}</strong> <br />
            {u.email} <br />
            Company: {u.company.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
