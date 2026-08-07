import { type ReactNode, useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle,
  User as UserIcon,
  Brain,
  BarChart3,
  Sparkles,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Failed to parse user data", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menu = [
    {
      name: "Home",
      path: "/student",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckCircle size={18} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={18} />,
    },
    {
      name: "AI Planner",
      path: "/ai-planner",
      icon: <Brain size={18} />,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: <FileText size={18} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserIcon size={18} />,
    },
  ];

  // Logged-in User Display Name Helper
  const userName =
    user?.username ||
    user?.name ||
    user?.fullName ||
    (user?.email ? user.email.split("@")[0] : "Student");

  const userRole =
    user?.role ||
    (user?.roles && user.roles.length > 0
      ? user.roles[0]
      : "Student");

  const userAvatar =
    user?.profilePic ||
    user?.avatar ||
    user?.image ||
    user?.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName
    )}&background=6366f1&color=fff`;

  return (
    <div className="flex h-screen bg-slate-50/60 overflow-hidden font-sans">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static
        top-0 left-0
        h-full
        w-64
        bg-white
        border-r
        border-slate-100
        shadow-sm
        p-4
        flex
        flex-col
        justify-between
        z-50
        transition-transform
        duration-300
        ease-in-out
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="space-y-6">
          {/* MOBILE CLOSE */}
          <div className="flex justify-between items-center lg:hidden">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* LOGO & USER TITLE */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 flex items-center justify-center text-amber-300 shadow-md shadow-indigo-950/20 shrink-0">
              <Sparkles size={20} />
            </div>

            <div className="min-w-0">
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-none truncate">
                Smart Planner
              </h1>
              <p className="text-[11px] font-medium text-slate-400 mt-1 truncate capitalize">
                {userName}'s Dashboard
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    flex
                    items-center
                    justify-between
                    w-full
                    px-3
                    py-2.5
                    rounded-xl
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>

                  {isActive && (
                    <ChevronRight size={14} className="opacity-80" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* FOOTER */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-2.5
            px-3
            rounded-xl
            bg-rose-50
            hover:bg-rose-100
            text-rose-600
            text-xs
            font-semibold
            transition-all
            "
          >
            <LogOut size={16} />
            Sign Out
          </button>

          <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100/80 text-center">
            <p className="text-[10px] font-medium text-slate-400">
              © Smart Study Planner
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header
          className="
          sticky
          top-0
          z-30
          h-16
          bg-white/80
          backdrop-blur-md
          border-b
          border-slate-100
          flex
          items-center
          justify-between
          px-4
          sm:px-6
          "
        >
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* PAGE TITLE / BREADCRUMB INDICATOR */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {menu.find((m) => m.path === location.pathname)?.name ||
                "Dashboard"}
            </span>
          </div>

          {/* LOGGED IN USER PROFILE DISPLAY */}
          <button
            onClick={() => navigate("/profile")}
            className="
            flex
            items-center
            gap-3
            p-1.5
            pr-3
            rounded-xl
            hover:bg-slate-50
            border
            border-transparent
            hover:border-slate-100
            transition-all
            ml-auto
            "
          >
            <div className="relative">
              <img
                src={userAvatar}
                alt={userName}
                className="
                w-9
                h-9
                rounded-xl
                object-cover
                border
                border-slate-200
                bg-indigo-50
                "
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight capitalize">
                {userName}
              </p>
              <p className="text-[10px] font-medium text-indigo-600 capitalize">
                {userRole}
              </p>
            </div>
          </button>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;