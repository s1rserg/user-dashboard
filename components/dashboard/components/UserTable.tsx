import { User } from '@/types';
import { FC } from 'react';

interface Props {
  users: User[];
}

export const UserTable: FC<Props> = ({ users }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="hidden bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Company
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.id} className="flex flex-col border-b last:border-none p-2 hover:bg-gray-50">
              <td className="block px-6 py-1 font-medium text-gray-900">{u.name}</td>
              <td className="block px-6 py-1 text-gray-500">{u.email}</td>
              <td className="block px-6 py-1 text-gray-500">{u.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
