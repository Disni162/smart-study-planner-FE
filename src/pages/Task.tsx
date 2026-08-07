import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../redux/taskSlice";
import {
  CheckCircle,
  Clock,
  Plus,
  Trash2,
  Calendar,
  Check,
  Sparkles,
  ListTodo,
} from "lucide-react";

const Task = () => {
  const dispatch = useDispatch<any>();

  const tasks = useSelector(
    (state: RootState) => state.tasks.tasks
  );

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      await dispatch(
        addTask({
          title,
          deadline,
        })
      );

      setTitle("");
      setDeadline("");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (
    id: string,
    completed: boolean
  ) => {
    try {
      await dispatch(
        updateTask({
          id,
          data: {
            completed: !completed,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskHandler = async (
    id: string
  ) => {
    try {
      await dispatch(deleteTask(id));
    } catch (error) {
      console.log(error);
    }
  };

  const completedCount =
    tasks.filter(
      (task: any) => task.completed
    ).length;

  const pendingCount =
    tasks.length - completedCount;

  const upcomingTasks = tasks
    .filter(
      (task: any) =>
        task.deadline &&
        !task.completed &&
        new Date(task.deadline) >= new Date()
    )
    .sort(
      (a: any, b: any) =>
        new Date(a.deadline).getTime() -
        new Date(b.deadline).getTime()
    )
    .slice(0, 3);

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
              <ListTodo size={20} />
            </div>
            Task Manager
          </h1>

          <p className="text-slate-500 text-xs mt-1">
            Manage your daily study activities
          </p>
        </div>
      </div>

      {/* Create Task Card */}
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-100
        shadow-sm
        p-4
        sm:p-5
        space-y-4
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
          <Sparkles size={15} className="text-amber-500" />
          Create New Task
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-3
        "
        >
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Enter task title"
            className="
            px-3.5
            py-2.5
            rounded-xl
            border
            border-slate-200
            bg-slate-50/50
            text-xs
            text-slate-800
            outline-none
            focus:ring-2
            focus:ring-indigo-500/20
            focus:border-indigo-500
            transition-all
            w-full
          "
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            className="
            px-3.5
            py-2.5
            rounded-xl
            border
            border-slate-200
            bg-slate-50/50
            text-xs
            text-slate-800
            outline-none
            focus:ring-2
            focus:ring-indigo-500/20
            focus:border-indigo-500
            transition-all
            w-full
          "
          />

          <button
            onClick={handleAdd}
            className="
            flex
            items-center
            justify-center
            gap-1.5
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            font-semibold
            text-xs
            px-4
            py-2.5
            rounded-xl
            shadow-md
            shadow-indigo-500/20
            hover:shadow-indigo-500/30
            transition-all
            w-full
          "
          >
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
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
              {completedCount}
            </h2>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle size={18} />
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
              {pendingCount}
            </h2>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines Banner */}
      <div
        className="
        bg-gradient-to-r
        from-amber-50/70
        to-orange-50/70
        border
        border-amber-200/60
        rounded-2xl
        p-4
        sm:p-5
      "
      >
        <h2
          className="
          text-sm
          font-bold
          text-slate-800
          mb-3
          flex
          items-center
          gap-2
        "
        >
          <Clock size={16} className="text-amber-600" />
          Upcoming Deadlines
        </h2>

        {upcomingTasks.length === 0 ? (
          <p className="text-slate-500 text-xs">
            No upcoming deadlines
          </p>
        ) : (
          <div className="space-y-2">
            {upcomingTasks.map((task: any) => (
              <div
                key={task._id}
                className="
                bg-white/80
                backdrop-blur-sm
                rounded-xl
                p-3
                border
                border-amber-100
                shadow-sm
                flex
                items-center
                justify-between
              "
              >
                <h3 className="font-semibold text-slate-800 text-xs">
                  {task.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Calendar size={13} className="text-amber-500" />
                  Due :{" "}
                  {new Date(
                    task.deadline
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Tasks Section */}
      <div className="space-y-3">
        <h2
          className="
          text-base
          font-bold
          text-slate-900
          tracking-tight
        "
        >
          📚 All Tasks ({tasks.length})
        </h2>

        {tasks.length === 0 ? (
          <div
            className="
            bg-slate-50/50
            border
            border-dashed
            border-slate-200
            rounded-2xl
            p-8
            text-center
            space-y-2
          "
          >
            <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <ListTodo size={20} />
            </div>
            <p className="text-slate-500 text-xs">
              No tasks added yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {tasks.map((task: any) => (
              <div
                key={task._id}
                className="
                bg-white
                border
                border-slate-100
                rounded-2xl
                p-4
                shadow-sm
                hover:shadow-md
                transition-all
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                sm:items-center
                gap-3
              "
              >
                <div className="flex-1 space-y-1">
                  <h3
                    className={`
                    text-sm
                    sm:text-base
                    font-semibold
                    ${
                      task.completed
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }
                  `}
                  >
                    {task.title}
                  </h3>

                  {task.deadline && (
                    <p
                      className="
                      text-xs
                      text-slate-500
                      flex
                      items-center
                      gap-1
                    "
                    >
                      <Calendar
                        size={13}
                        className="text-indigo-500"
                      />
                      {new Date(
                        task.deadline
                      ).toLocaleDateString()}
                    </p>
                  )}

                  <span
                    className={`
                    inline-block
                    px-2.5
                    py-0.5
                    rounded-full
                    text-[10px]
                    font-semibold
                    border
                    ${
                      task.completed
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-indigo-50 text-indigo-600 border-indigo-100"
                    }
                  `}
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  w-full
                  sm:w-auto
                "
                >
                  <button
                    onClick={() =>
                      toggleTask(
                        task._id,
                        task.completed
                      )
                    }
                    className={`
                    flex-1
                    sm:flex-none
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-xl
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      task.completed
                        ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                        : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                    }
                  `}
                    title={
                      task.completed
                        ? "Mark Pending"
                        : "Mark Completed"
                    }
                  >
                    <Check size={14} />
                    {task.completed
                      ? "Undo"
                      : "Done"}
                  </button>

                  <button
                    onClick={() =>
                      deleteTaskHandler(task._id)
                    }
                    className="
                    flex-1
                    sm:flex-none
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-xl
                    bg-rose-50
                    text-rose-600
                    hover:bg-rose-100
                    text-xs
                    font-semibold
                    transition-all
                  "
                    title="Delete Task"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;