import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  PieChart as PieIcon,
  
} from "lucide-react";

const Analytics = () => {
  const tasks = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const completed = tasks.filter(
    (task: any) => task.completed
  ).length;

  const pending = tasks.length - completed;

  const productivity =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0;

  const pieData = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const subjectCounts: any = {};

  tasks.forEach((task: any) => {
    const subject = task.subject || "Other";

    subjectCounts[subject] =
      (subjectCounts[subject] || 0) + 1;
  });

  const barData = Object.keys(subjectCounts).map(
    (subject) => ({
      subject,
      tasks: subjectCounts[subject],
    })
  );

  const COLORS = ["#10b981", "#f59e0b"];

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1
            className="
            text-xl
            sm:text-2xl
            font-extrabold
            text-slate-900
            flex
            items-center
            gap-2.5
            tracking-tight
          "
          >
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <BarChart3 size={20} />
            </div>
            Analytics Dashboard
          </h1>

          <p className="text-slate-500 text-xs mt-1">
            Track your study progress and productivity metrics
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-3
        gap-3
      "
      >
        <div
          className="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
          border
          border-slate-100
          flex
          justify-between
          items-center
        "
        >
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Tasks
            </p>

            <h2
              className="
              text-xl
              sm:text-2xl
              font-extrabold
              text-indigo-600
              tracking-tight
            "
            >
              {tasks.length}
            </h2>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <ListTodo size={18} />
          </div>
        </div>

        <div
          className="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
          border
          border-slate-100
          flex
          justify-between
          items-center
        "
        >
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Completed
            </p>

            <h2
              className="
              text-xl
              sm:text-2xl
              font-extrabold
              text-emerald-600
              tracking-tight
            "
            >
              {completed}
            </h2>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div
          className="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
          border
          border-slate-100
          flex
          justify-between
          items-center
        "
        >
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Pending
            </p>

            <h2
              className="
              text-xl
              sm:text-2xl
              font-extrabold
              text-amber-600
              tracking-tight
            "
            >
              {pending}
            </h2>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Charts Section Grid */}
      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-4
      "
      >
        {/* Task Status Pie Chart */}
        <div
          className="
          bg-white
          p-4
          sm:p-5
          rounded-2xl
          border
          border-slate-100
          shadow-sm
          space-y-3
        "
        >
          <div className="flex items-center justify-between">
            <h2
              className="
              text-sm
              font-bold
              text-slate-800
              flex
              items-center
              gap-2
            "
            >
              <PieIcon size={16} className="text-indigo-600" />
              Task Status Overview
            </h2>

            <div className="flex items-center gap-3 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Done
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Pending
              </span>
            </div>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks per Subject Bar Chart */}
        <div
          className="
          bg-white
          p-4
          sm:p-5
          rounded-2xl
          border
          border-slate-100
          shadow-sm
          space-y-3
        "
        >
          <h2
            className="
            text-sm
            font-bold
            text-slate-800
            flex
            items-center
            gap-2
          "
          >
            <BarChart3 size={16} className="text-indigo-600" />
            Tasks Per Subject
          </h2>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="tasks" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Productivity Card */}
      <div
        className="
        bg-white
        p-4
        sm:p-5
        rounded-2xl
        border
        border-slate-100
        shadow-sm
        space-y-3
      "
      >
        <div className="flex items-center justify-between">
          <h2
            className="
            text-sm
            font-bold
            text-slate-800
            flex
            items-center
            gap-2
          "
          >
            <TrendingUp size={16} className="text-indigo-600" />
            Productivity Rate
          </h2>

          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
            Target Score
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {productivity}%
          </span>
          <span className="text-xs text-slate-400 font-medium">
            overall task completion speed
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div
            className="
            w-full
            h-2.5
            bg-slate-100
            rounded-full
            overflow-hidden
          "
          >
            <div
              className="
              h-full
              bg-indigo-600
              rounded-full
              transition-all
              duration-500
            "
              style={{
                width: `${productivity}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;