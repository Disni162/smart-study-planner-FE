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
} from "recharts";

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
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
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

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Total Tasks</h2>
          <p className="text-3xl font-bold mt-2">
            {tasks.length}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Completed</h2>
          <p className="text-3xl font-bold mt-2">
            {completed}
          </p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Pending</h2>
          <p className="text-3xl font-bold mt-2">
            {pending}
          </p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Tasks Per Subject
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={barData}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* PRODUCTIVITY CARD */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-xl font-semibold">
          Productivity
        </h2>

        <p className="text-5xl font-bold text-blue-600 mt-4">
          {productivity}%
        </p>

      </div>

    </div>
  );
};

export default Analytics;