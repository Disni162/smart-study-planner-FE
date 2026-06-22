import React, { useEffect, useState } from "react";
import api from "../service/api";

type User = {
  id?: string | number;
  name?: string;
  email?: string;
  [key: string]: any;
};

const UsersTable: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
        </tr>
      </thead>
      <tbody>
        {users && users.length ? (
          users.map((u, i) => (
            <tr key={u.id ?? i}>
              <td className="border px-4 py-2">{u.id}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="border px-4 py-2" colSpan={3}>
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users Management</h1>

      <UsersTable users={users} />
    </div>
  );
};

export default Users;