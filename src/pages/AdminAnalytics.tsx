import { useEffect, useState } from "react";
import api from "../service/api";

import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Clock,
  TrendingUp,
  PieChart as PieIcon,
  Activity,
  Loader2,
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
          (stats.completedTasks / stats.totalTasks) * 100
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

  // Soft Calm Chart Colors: Emerald Green & Rose Red
  const COLORS = ["#10b981", "#f43f5e"];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-base font-medium text-slate-500">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-slate-700 antialiased font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-50/50 via-teal-50/30 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-indigo-800 bg-indigo-50 border border-indigo-100/80 rounded-full">
              Real-time Metrics
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800">
              Admin Analytics
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-1 max-w-2xl">
              Monitor platform performance and study statistics effortlessly.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* Total Users */}
          <div className="bg-white rounded-2xl border border-sky-100/80 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Users
              </span>
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-700">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mt-4 tracking-tight">
              {stats.totalUsers.toLocaleString()}
            </p>
          </div>

          {/* Total Subjects */}
          <div className="bg-white rounded-2xl border border-purple-100/80 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Subjects
              </span>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mt-4 tracking-tight">
              {stats.totalSubjects.toLocaleString()}
            </p>
          </div>

          {/* Total Tasks */}
          <div className="bg-white rounded-2xl border border-amber-100/80 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Tasks
              </span>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mt-4 tracking-tight">
              {stats.totalTasks.toLocaleString()}
            </p>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-2xl border border-emerald-100/80 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Completed Tasks
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-emerald-700 mt-4 tracking-tight">
              {stats.completedTasks.toLocaleString()}
            </p>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-2xl border border-rose-100/80 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pending Tasks
              </span>
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-bold text-rose-700 mt-4 tracking-tight">
              {stats.pendingTasks.toLocaleString()}
            </p>
          </div>

          {/* Productivity */}
          <div className="bg-white rounded-2xl border border-indigo-100/80 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Productivity
              </span>
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <p className="text-3xl font-bold text-indigo-700 mt-4 tracking-tight">
              {productivity}%
            </p>

            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden p-0.5">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${productivity}%`,
                }}
              />
            </div>
          </div>

        </div>

        {/* Charts & Summary Grid */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Pie Chart Card */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
                <PieIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800">
                Task Completion Overview
              </h2>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1 border-slate-100",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Pie Chart Legend */}
            <div className="flex justify-center items-center space-x-6 pt-2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-slate-600">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-xs font-medium text-slate-600">Pending</span>
              </div>
            </div>
          </div>

          {/* System Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-slate-100/80 text-slate-600 rounded-xl">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  System Summary
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                <div className="flex justify-between items-center py-3.5">
                  <span className="text-slate-500 text-sm">Total Users</span>
                  <span className="font-semibold text-slate-700 bg-slate-100/80 px-3 py-1 rounded-full text-xs">
                    {stats.totalUsers.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3.5">
                  <span className="text-slate-500 text-sm">Total Subjects</span>
                  <span className="font-semibold text-slate-700 bg-slate-100/80 px-3 py-1 rounded-full text-xs">
                    {stats.totalSubjects.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3.5">
                  <span className="text-slate-500 text-sm">Total Tasks</span>
                  <span className="font-semibold text-slate-700 bg-slate-100/80 px-3 py-1 rounded-full text-xs">
                    {stats.totalTasks.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3.5">
                  <span className="text-slate-500 text-sm">Completed</span>
                  <span className="font-medium text-emerald-700 bg-emerald-50 border border-emerald-100/60 px-3 py-1 rounded-full text-xs">
                    {stats.completedTasks.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3.5">
                  <span className="text-slate-500 text-sm">Pending</span>
                  <span className="font-medium text-rose-700 bg-rose-50 border border-rose-100/60 px-3 py-1 rounded-full text-xs">
                    {stats.pendingTasks.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;