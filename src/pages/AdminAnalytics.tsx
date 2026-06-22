import { useEffect, useState } from "react";
import api from "../service/api";

import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Stats = {
  totalUsers: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalSubjects: number;
};

const AdminAnalytics = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalSubjects: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const productivity =
    stats.totalTasks > 0
      ? Math.round(
          (stats.completedTasks / stats.totalTasks) *
            100
        )
      : 0;

  const chartData = [
    {
      name: "Completed",
      value: stats.completedTasks,
    },
    {
      name: "Pending",
      value: stats.pendingTasks,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-xl font-semibold">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Admin Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor platform performance and study
          statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-500">
              Total Users
            </h2>

            <Users className="text-blue-600" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-500">
              Total Subjects
            </h2>

            <BookOpen className="text-purple-600" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {stats.totalSubjects}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-500">
              Total Tasks
            </h2>

            <ClipboardList className="text-orange-500" />
          </div>

          <p className="text-4xl font-bold mt-4">
            {stats.totalTasks}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-500">
              Completed Tasks
            </h2>

            <CheckCircle className="text-green-600" />
          </div>

          <p className="text-4xl font-bold mt-4 text-green-600">
            {stats.completedTasks}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-500">
              Pending Tasks
            </h2>

            <Clock className="text-red-600" />
          </div>

          <p className="text-4xl font-bold mt-4 text-red-600">
            {stats.pendingTasks}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-500">
              Productivity
            </h2>

            <TrendingUp className="text-indigo-600" />
          </div>

          <p className="text-4xl font-bold mt-4 text-indigo-600">
            {productivity}%
          </p>

          <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
            <div
              className="bg-indigo-600 h-3 rounded-full"
              style={{
                width: `${productivity}%`,
              }}
            />
          </div>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            Task Completion Overview
          </h2>

          <div className="h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >
                  {chartData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <h2 className="text-xl font-bold mb-6">
            System Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span>Total Users</span>
              <span className="font-bold">
                {stats.totalUsers}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Subjects</span>
              <span className="font-bold">
                {stats.totalSubjects}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Tasks</span>
              <span className="font-bold">
                {stats.totalTasks}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Completed</span>
              <span className="font-bold text-green-600">
                {stats.completedTasks}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-bold text-red-600">
                {stats.pendingTasks}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;