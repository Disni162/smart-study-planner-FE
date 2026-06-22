import { useEffect, useState } from "react";
import api from "../service/api";

interface User {
  _id: string;
  name: string;
  email: string;
  roles: string[];
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`);

      setUsers(
        users.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="border-b border-[#E2E8E5] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#1C2D2A]">
          User Directories
        </h1>
        <p className="text-[#7A8A87] text-sm mt-1 font-medium">
          Manage accounts, control system access levels, and audit registrations.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8E5] rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-[#7A8A87] text-xs font-semibold tracking-wider uppercase">
              Total Members
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-[#1C2D2A] tracking-tight">
                {users.length}
              </span>
              <span className="text-xs text-[#2D7A6F] font-medium bg-[#E8F3F1] px-2 py-0.5 rounded-full border border-[#D1E7E4]">
                Active
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#F4F7F6] flex items-center justify-center text-[#7A8A87] border border-[#E2E8E5] text-base">
            👥
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="px-4 py-3 border border-[#E2E8E5] rounded-xl bg-white w-full md:w-80"
        />

        <div className="text-sm text-[#7A8A87] font-medium">
          Showing {filteredUsers.length} users
        </div>

      </div>

      {/* Data Table Section */}
      <div className="bg-white border border-[#E2E8E5] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E2E8E5] flex items-center justify-between bg-[#F8FAFA]">
          <h2 className="text-sm font-semibold text-[#1C2D2A]">
            Registered Accounts
          </h2>
          <span className="text-xs text-[#5C6E6B] bg-white px-2.5 py-1 rounded-md border border-[#E2E8E5] font-medium">
            {users.length} profiles listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8E5] bg-[#F4F7F6] text-[#7A8A87] text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Identity</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Access Level</th>
                <th className="py-4 px-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8E5] text-sm">
              {users.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-[#F4F7F6]/40 transition-colors duration-150 group"
                  >
                    {/* User Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-[#E2E8E5] text-[#4A5D5A] flex items-center justify-center font-bold shadow-sm group-hover:bg-[#D1E7E4] group-hover:text-[#2D7A6F] transition-colors">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-medium text-[#1C2D2A] block">
                            {user.name}
                          </span>
                          <span className="text-xs text-[#98A7A4] block font-mono">
                            ID: {user._id.slice(-6)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-6 text-[#5C6E6B] font-normal">
                      {user.email}
                    </td>

                    {/* Roles Badges */}
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5">
                        {user.roles?.map((role, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide border ${role.toLowerCase() === "admin"
                                ? "bg-[#FFF5F5] text-red-700 border-[#FAD2D2]"
                                : "bg-[#EDF2F7] text-slate-700 border-[#E2E8F0]"
                              }`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setSelectedUser(user)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 border border-blue-200"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user._id)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-[#E2E8E5]"
                        >
                          Remove
                        </button>

                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 bg-[#F4F7F6] rounded-full flex items-center justify-center text-[#98A7A4] border border-[#E2E8E5] text-lg">
                        📁
                      </div>
                      <p className="text-[#7A8A87] font-medium text-sm">
                        No profiles available
                      </p>
                      <p className="text-xs text-[#98A7A4]">
                        The current data scope contains zero active user accounts.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {selectedUser && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

              <div className="bg-white rounded-3xl p-8 w-[450px] shadow-xl">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold">
                    User Details
                  </h2>

                  <button
                    onClick={() =>
                      setSelectedUser(null)
                    }
                  >
                    ✕
                  </button>

                </div>

                <div className="space-y-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Name
                    </p>

                    <p className="font-semibold">
                      {selectedUser.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Email
                    </p>

                    <p className="font-semibold">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Roles
                    </p>

                    <div className="flex gap-2 mt-2">
                      {selectedUser.roles?.map(
                        (role, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded bg-slate-100 text-sm"
                          >
                            {role}
                          </span>
                        )
                      )}
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>
      </div>

    </div>

  );
};

export default AdminUsers;