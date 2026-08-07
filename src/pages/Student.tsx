import { useEffect, useState } from "react";
import api from "../service/api";
import {
  Plus,
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Subject = {
  _id: string;
  title: string;
  description?: string;
  color?: string;
};

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

const Home = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const subjectRes = await api.get("/subjects");
      const taskRes = await api.get("/tasks");

      setSubjects(subjectRes.data.data || subjectRes.data || []);
      setTasks(taskRes.data.data || taskRes.data || []);
    } catch (error) {
      console.log("Dashboard Error :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const productivity = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-3">
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <BookOpen className="w-4 h-4 text-indigo-600 absolute animate-pulse" />
        </div>
        <p className="text-slate-500 font-medium text-xs tracking-wide animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Compact Hero Banner */}
      <div
        className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-slate-900
        via-indigo-950
        to-slate-900
        rounded-2xl
        p-5
        sm:p-6
        text-white
        shadow-lg
        border
        border-slate-800
      "
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-indigo-200 border border-white/10 mb-2">
              <Sparkles size={12} className="text-amber-300" />
              <span>Student Overview</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              👋 Welcome Back, Student!
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Manage your subjects, tasks and improve your productivity
            </p>
          </div>
        </div>
      </div>

      {/* Compact Metrics Stats Grid */}
      <div
        className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-3
        sm:gap-4
      "
      >
        <Card
          title="Subjects"
          value={subjects.length}
          icon={<BookOpen size={18} />}
          color="blue"
        />

        <Card
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Clock size={18} />}
          color="purple"
        />

        <Card
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle size={18} />}
          color="green"
        />

        <Card
          title="Productivity"
          value={`${productivity}%`}
          icon={<TrendingUp size={18} />}
          color="yellow"
        />
      </div>

      {/* Subjects Section */}
      <div className="space-y-4">
        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-3
        "
        >
          <div>
            <h2
              className="
              text-lg
              sm:text-xl
              font-bold
              text-slate-900
              tracking-tight
            "
            >
              📘 My Subjects
            </h2>

            <p className="text-slate-500 text-xs">
              Your learning subjects
            </p>
          </div>

          <button
            onClick={() => navigate("/subjects")}
            className="
            flex
            gap-1.5
            items-center
            justify-center
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
            hover:scale-[1.01]
            active:scale-[0.98]
            transition-all
            duration-150
            w-full
            sm:w-auto
            "
          >
            <Plus size={16} />
            Add Subject
          </button>
        </div>

        {subjects.length === 0 ? (
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
            <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen size={20} />
            </div>

            <h3 className="text-sm font-bold text-slate-800">
              No Subjects Added
            </h3>

            <p className="text-slate-500 text-xs">
              Create your first subject
            </p>

            <button
              onClick={() => navigate("/subjects")}
              className="mt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
            >
              Get started now <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
          >
            {subjects.map((subject) => {
              const themeColor = subject.color || "#3b82f6";
              return (
                <div
                  key={subject._id}
                  className="
                  group
                  relative
                  bg-white
                  rounded-2xl
                  p-4
                  sm:p-5
                  shadow-sm
                  hover:shadow-lg
                  border
                  border-slate-100
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  "
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-200 group-hover:h-1.5"
                    style={{ backgroundColor: themeColor }}
                  />

                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className="
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-white
                        text-base
                        font-bold
                        shadow-sm
                        transition-transform
                        duration-200
                        group-hover:scale-105
                        "
                        style={{
                          backgroundColor: themeColor,
                        }}
                      >
                        {subject.title.charAt(0).toUpperCase()}
                      </div>
                    </div>

                    <h3
                      className="
                      text-base
                      font-bold
                      text-slate-800
                      mt-3
                      group-hover:text-indigo-600
                      transition-colors
                      "
                    >
                      {subject.title}
                    </h3>

                    <p
                      className="
                      text-slate-500
                      text-xs
                      mt-1
                      line-clamp-2
                      leading-relaxed
                      "
                    >
                      {subject.description || "No description"}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/subjects")}
                    className="
                    mt-4
                    w-full
                    py-2
                    px-3
                    rounded-lg
                    bg-slate-50
                    hover:bg-slate-900
                    text-slate-700
                    hover:text-white
                    font-medium
                    text-xs
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    transition-all
                    duration-150
                    group/btn
                    "
                  >
                    <span>View Details</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, color }: any) => {
  const colors: any = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      border: "border-blue-100",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-600",
      border: "border-purple-100",
    },
    green: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600",
      border: "border-emerald-100",
    },
    yellow: {
      bg: "bg-amber-500/10",
      text: "text-amber-600",
      border: "border-amber-100",
    },
  };

  const theme = colors[color] || colors.blue;

  return (
    <div
      className="
      group
      bg-white
      rounded-2xl
      p-4
      shadow-sm
      hover:shadow-md
      border
      border-slate-100
      hover:-translate-y-0.5
      transition-all
      duration-200
    "
    >
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2
            className="
            text-xl
            sm:text-2xl
            font-extrabold
            text-slate-800
            tracking-tight
            group-hover:text-indigo-600
            transition-colors
          "
          >
            {value}
          </h2>
        </div>

        <div
          className={`
          p-2.5
          rounded-xl
          ${theme.bg}
          ${theme.text}
          border
          ${theme.border}
          transition-transform
          duration-200
          group-hover:scale-105
        `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Home;