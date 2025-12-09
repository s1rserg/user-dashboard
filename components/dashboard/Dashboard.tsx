'use client';

import { useUsers } from '@/hooks';

export default function Dashboard() {
  const { users, loading, error } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users</h1>
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
}
