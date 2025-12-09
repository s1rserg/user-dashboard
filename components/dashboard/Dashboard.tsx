'use client';

import { useState, useEffect } from 'react';
import { useDebounce, useUsers } from '@/hooks';
import { Loader, SearchInput } from '@/components/shared';

export const Dashboard = () => {
  const { users, setSearch, loading, error, refetch } = useUsers();
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
        <h3>Oops! Something went wrong.</h3>
        <p>{error}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Users</h1>
      <SearchInput value={inputValue} onChange={setInputValue} />

      {!loading && users.length === 0 && <p>No users found matching {inputValue}</p>}

      <ul>
        {users.map((u) => (
          <li
            key={u.id}
            style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}
          >
            <strong>{u.name}</strong> <br />
            {u.email} <br />
            <span style={{ color: '#666', fontSize: '0.9em' }}>Company: {u.company.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
