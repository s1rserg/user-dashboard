import { User } from '@/types';
import { FC } from 'react';

interface Props {
  users: User[];
  headers: { name: string; email: string; company: string };
}

export const UserTable: FC<Props> = ({ users, headers }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="hidden bg-gray-50 md:table-header-group">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {headers.name}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {headers.email}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {headers.company}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((u) => (
            <tr
              key={u.id}
              className="flex flex-col border-b last:border-none p-2 md:table-row md:p-0 md:border-none hover:bg-gray-50"
            >
              <td className="block px-6 py-1 font-medium text-gray-900 md:table-cell md:py-4">
                {u.name}
              </td>
              <td className="block px-6 py-1 text-gray-500 md:table-cell md:py-4">{u.email}</td>
              <td className="block px-6 py-1 text-gray-500 md:table-cell md:py-4">
                {u.company.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
