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
      ? Math.round(
          (completed / tasks.length) * 100
        )
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
    const subject =
      task.subject || "Other";

    subjectCounts[subject] =
      (subjectCounts[subject] || 0) + 1;
  });

  const barData = Object.keys(
    subjectCounts
  ).map((subject) => ({
    subject,
    tasks: subjectCounts[subject],
  }));

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1
          className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          text-gray-800
        "
        >
          📊 Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Track your study progress and
          productivity
        </p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-5
        sm:gap-6
      "
      >
        <div
          className="
          bg-blue-500
          text-white
          p-5
          sm:p-6
          rounded-2xl
          shadow
        "
        >
          <h2 className="text-base sm:text-lg">
            Total Tasks
          </h2>

          <p
            className="
            text-3xl
            sm:text-4xl
            font-bold
            mt-2
          "
          >
            {tasks.length}
          </p>
        </div>

        <div
          className="
          bg-green-500
          text-white
          p-5
          sm:p-6
          rounded-2xl
          shadow
        "
        >
          <h2 className="text-base sm:text-lg">
            Completed
          </h2>

          <p
            className="
            text-3xl
            sm:text-4xl
            font-bold
            mt-2
          "
          >
            {completed}
          </p>
        </div>

        <div
          className="
          bg-red-500
          text-white
          p-5
          sm:p-6
          rounded-2xl
          shadow
        "
        >
          <h2 className="text-base sm:text-lg">
            Pending
          </h2>

          <p
            className="
            text-3xl
            sm:text-4xl
            font-bold
            mt-2
          "
          >
            {pending}
          </p>
        </div>
      </div>

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        sm:gap-8
      "
      >
        <div
          className="
          bg-white
          p-4
          sm:p-6
          rounded-2xl
          shadow
        "
        >
          <h2
            className="
            text-lg
            sm:text-xl
            font-semibold
            mb-4
          "
          >
            Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {pieData.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          className="
          bg-white
          p-4
          sm:p-6
          rounded-2xl
          shadow
        "
        >
          <h2
            className="
            text-lg
            sm:text-xl
            font-semibold
            mb-4
          "
          >
            Tasks Per Subject
          </h2>

          <div className="overflow-x-auto">
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart data={barData}>
                <XAxis
                  dataKey="subject"
                  tick={{
                    fontSize: 12,
                  }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="
        bg-white
        p-5
        sm:p-6
        rounded-2xl
        shadow
      "
      >
        <h2
          className="
          text-lg
          sm:text-xl
          font-semibold
        "
        >
          Productivity
        </h2>

        <p
          className="
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-bold
          text-blue-600
          mt-4
        "
        >
          {productivity}%
        </p>

        <div className="mt-5">
          <div
            className="
            w-full
            h-4
            bg-gray-200
            rounded-full
            overflow-hidden
          "
          >
            <div
              className="
              h-full
              bg-blue-600
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