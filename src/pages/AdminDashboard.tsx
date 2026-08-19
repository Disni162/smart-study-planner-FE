import { useEffect, useState } from "react";
import api from "../service/api";
import { 
  Users, 
  CheckSquare, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  BarChart2, 
  PieChart 
} from "lucide-react";

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
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  // Soft & Calm Color Configs
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-sky-700",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-100/80",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: CheckSquare,
      color: "text-indigo-700",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100/80",
    },
    {
      title: "Total Subjects",
      value: stats.totalSubjects,
      icon: BookOpen,
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100/80",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100/80",
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: Clock,
      color: "text-rose-700",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100/80",
    },
  ];

  return (
    // Calm Neutral Background
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-slate-700 antialiased font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Calm Welcome Banner */}
        <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-gradient-to-br from-teal-50/60 via-sky-50/40 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-100/80 rounded-full">
              Overview Dashboard
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800">
              Welcome Back, Admin 👋
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
              Manage students, monitor system performance, and oversee daily operations easily.
            </p>
          </div>
        </div>

        {/* Calm Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {statCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`bg-white border ${card.borderColor} rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {card.title}
                  </span>
                  <div className={`p-2.5 rounded-xl ${card.bgColor} ${card.color}`}>
                    <IconComponent className="w-5 h-5 opacity-90" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-slate-800 tracking-tight">
                    {card.value.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* System Overview */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-slate-100/80 text-slate-600 rounded-xl">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  System Overview
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
                  <span className="text-slate-500 text-sm">Pending Tasks</span>
                  <span className="font-medium text-rose-700 bg-rose-50 border border-rose-100/60 px-3 py-1 rounded-full text-xs">
                    {stats.pendingTasks.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-teal-50 text-teal-700 rounded-xl">
                  <PieChart className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Task Completion Progress
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-sm font-medium">Overall Progress</span>
                  <span className="text-base font-semibold text-teal-700 bg-teal-50 border border-teal-100/80 px-2.5 py-0.5 rounded-lg">
                    {completionRate}%
                  </span>
                </div>

                {/* Calm Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${completionRate}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Completed Tasks</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-lg text-xs">
                    {stats.completedTasks.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Pending Tasks</span>
                  <span className="font-semibold text-rose-700 bg-rose-50 border border-rose-100/60 px-2.5 py-0.5 rounded-lg text-xs">
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

export default AdminDashboard;