'use client';

import { useState, useEffect } from 'react';
import { useDebounce, useUsers } from '@/hooks';
import { Loader, SearchInput, Pagination } from '@/components/shared';
import { ITEMS_PER_PAGE } from './constants';

export const Dashboard = () => {
  const { users, setSearch, loading, error, refetch } = useUsers();

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useDebounce(inputValue, 500);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    setCurrentPage(1);
  };

  if (loading) return <Loader />;

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
      <SearchInput value={inputValue} onChange={handleSearchChange} />

      {!loading && users.length === 0 && <p>No users found matching {inputValue}</p>}

      <ul>
        {currentUsers.map((u) => (
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
