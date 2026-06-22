import { useEffect, useState } from "react";
import api from "../service/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalSubjects: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const completionRate =
    stats.totalTasks > 0
      ? Math.round(
          (stats.completedTasks / stats.totalTasks) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-6 text-gray-800">

     

      {/* Welcome Banner */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg mb-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back Admin 👋
        </h2>

        <p className="mt-3 text-gray-500">
          Manage students, monitor performance and oversee the system.
        </p>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        {/* Total Users */}
        <div className="bg-white border border-cyan-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition">

          <h3 className="text-gray-500 font-medium">
            Total Users
          </h3>

          <p className="text-4xl font-bold text-cyan-600 mt-3">
            {stats.totalUsers}
          </p>

        </div>

        {/* Total Tasks */}
        <div className="bg-white border border-green-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition">

          <h3 className="text-gray-500 font-medium">
            Total Tasks
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.totalTasks}
          </p>

        </div>

        {/* Subjects */}
        <div className="bg-white border border-purple-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition">

          <h3 className="text-gray-500 font-medium">
            Total Subjects
          </h3>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {stats.totalSubjects}
          </p>

        </div>

        {/* Completed */}
        <div className="bg-white border border-emerald-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition">

          <h3 className="text-gray-500 font-medium">
            Completed Tasks
          </h3>

          <p className="text-4xl font-bold text-emerald-600 mt-3">
            {stats.completedTasks}
          </p>

        </div>

        {/* Pending */}
        <div className="bg-white border border-red-100 p-6 rounded-3xl shadow-md hover:shadow-xl transition">

          <h3 className="text-gray-500 font-medium">
            Pending Tasks
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.pendingTasks}
          </p>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* System Overview */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            System Overview
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-500">
                Total Users
              </span>

              <span className="font-bold">
                {stats.totalUsers}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-500">
                Total Subjects
              </span>

              <span className="font-bold">
                {stats.totalSubjects}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span className="text-gray-500">
                Total Tasks
              </span>

              <span className="font-bold">
                {stats.totalTasks}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Pending Tasks
              </span>

              <span className="font-bold text-red-600">
                {stats.pendingTasks}
              </span>
            </div>

          </div>

        </div>

        {/* Progress Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Task Completion Progress
          </h2>

          <div className="flex justify-between mb-3">
            <span className="text-gray-500">
              Progress
            </span>

            <span className="font-bold">
              {completionRate}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-5 rounded-full transition-all duration-700"
              style={{
                width: `${completionRate}%`,
              }}
            />

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Completed Tasks
              </span>

              <span className="font-semibold text-green-600">
                {stats.completedTasks}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Pending Tasks
              </span>

              <span className="font-semibold text-red-600">
                {stats.pendingTasks}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;