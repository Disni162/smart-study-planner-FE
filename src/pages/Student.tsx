import { useEffect, useState } from "react";
import api from "../service/api";
import {
  Plus,
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
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

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const productivity = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        rounded-3xl
        p-5
        sm:p-6
        lg:p-8
        text-white
        shadow-xl
      "
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          👋 Welcome Back Student
        </h1>

        <p className="mt-3 text-sm sm:text-base text-white/80">
          Manage your subjects, tasks and improve your productivity
        </p>
      </div>

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        sm:gap-6
      "
      >
        <Card
          title="Subjects"
          value={subjects.length}
          icon={<BookOpen />}
          color="blue"
        />

        <Card
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Clock />}
          color="purple"
        />

        <Card
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle />}
          color="green"
        />

        <Card
          title="Productivity"
          value={`${productivity}%`}
          icon={<TrendingUp />}
          color="yellow"
        />
      </div>

      <div>
        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
          mb-6
        "
        >
          <div>
            <h2
              className="
              text-2xl
              sm:text-3xl
              font-bold
            "
            >
              📘 My Subjects
            </h2>

            <p className="text-gray-500">
              Your learning subjects
            </p>
          </div>

          <button
            onClick={() => navigate("/subjects")}
            className="
            flex
            gap-2
            items-center
            justify-center
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            text-white
            px-5
            py-3
            rounded-2xl
            w-full
            sm:w-auto
            "
          >
            <Plus size={20} />
            Add Subject
          </button>
        </div>

        {subjects.length === 0 ? (
          <div
            className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow
          "
          >
            <h3 className="text-xl font-semibold">
              No Subjects Added
            </h3>

            <p className="text-gray-500 mt-2">
              Create your first subject
            </p>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
          >
            {subjects.map((subject) => (
              <div
                key={subject._id}
                className="
                bg-white
                rounded-3xl
                p-5
                sm:p-6
                shadow-md
                border
                hover:shadow-xl
                transition
                "
                style={{
                  borderTop: `5px solid ${
                    subject.color || "#3b82f6"
                  }`,
                }}
              >
                <div
                  className="
                  w-14
                  h-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-white
                  text-2xl
                  font-bold
                  "
                  style={{
                    backgroundColor:
                      subject.color || "#3b82f6",
                  }}
                >
                  {subject.title
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h3
                  className="
                  text-xl
                  font-bold
                  mt-5
                  "
                >
                  {subject.title}
                </h3>

                <p
                  className="
                  text-gray-500
                  mt-3
                  "
                >
                  {subject.description ||
                    "No description"}
                </p>

                <button
                  onClick={() =>
                    navigate("/subjects")
                  }
                  className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                  "
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  icon,
  color,
}: any) => {
  const colors: any = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-5
      sm:p-6
      shadow-md
      border
    "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400">
            {title}
          </p>

          <h2
            className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            mt-2
          "
          >
            {value}
          </h2>
        </div>

        <div
          className={`
          p-3
          rounded-2xl
          ${colors[color]}
        `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Home;