import { type ReactNode, useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  LogOut,
  ShieldCheck,
  BookOpen,
  ClipboardList,
  FileText,
  User,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface UserData {
  name: string;
  role?: string;
}

const AdminLayout = ({
  children,
}: Props) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [, setCurrentUser] =
    useState<UserData | null>(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser =
          JSON.parse(storedUser);

        setCurrentUser(parsedUser);
      } catch (error) {
        console.error(
          "Error parsing user data",
          error
        );
      }
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: (
        <LayoutDashboard size={18} />
      ),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
    {
      name: "Subjects",
      path: "/admin/subjects",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: (
        <ClipboardList size={18} />
      ),
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FileText size={18} />,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: <User size={18} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7F6] text-[#3A4D4A]">
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          z-40
          lg:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
        fixed
        lg:sticky
        top-0
        left-0
        z-50
        h-screen
        w-72
        bg-white
        border-r
        border-[#E2E8E5]
        flex
        flex-col
        justify-between
        p-6
        transition-transform
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        `}
      >
        <div className="flex flex-col flex-1 overflow-y-auto space-y-6">
          {/* Logo */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-[#E8F3F1]
                border
                border-[#D1E7E4]
                flex
                items-center
                justify-center
                text-[#2D7A6F]
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <h1
                  className="
                  text-base
                  font-bold
                  text-[#1C2D2A]
                  "
                >
                  Admin Console
                </h1>

                <p
                  className="
                  text-xs
                  text-[#7A8A87]
                  "
                >
                  Smart Study Planner
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="lg:hidden"
            >
              <X size={22} />
            </button>
          </div>

          {/* Menu */}

          <nav className="space-y-2">
            {menu.map((item) => {
              const isActive =
                location.pathname ===
                item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all

                  ${
                    isActive
                      ? "bg-[#E8F3F1] text-[#2D7A6F]"
                      : "text-[#5C6E6B] hover:bg-[#F4F7F6]"
                  }
                  `}
                >
                  {item.icon}

                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          justify-center
          gap-2
          w-full
          py-3
          rounded-xl
          border
          border-[#E2E8E5]
          hover:bg-red-50
          hover:text-red-600
          transition
          "
        >
          <LogOut size={16} />

          Sign Out
        </button>
      </aside>

      {/* Main Area */}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}

        <header
          className="
          bg-white
          border-b
          border-[#E2E8E5]
          px-4
          sm:px-6
          lg:px-8
          py-4
          flex
          items-center
          justify-between
          sticky
          top-0
          z-30
          "
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="
              lg:hidden
              p-2
              rounded-lg
              hover:bg-gray-100
              "
            >
              <Menu size={22} />
            </button>

            <h2
              className="
              text-xs
              sm:text-sm
              font-semibold
              uppercase
              tracking-wider
              text-[#1C2D2A]
              "
            >
              {location.pathname ===
              "/admin/users"
                ? "User Management"
                : location.pathname ===
                  "/admin/subjects"
                ? "Subject Management"
                : location.pathname ===
                  "/admin/profile"
                ? "Admin Profile"
                : location.pathname ===
                  "/admin/reports"
                ? "Reports"
                : location.pathname ===
                  "/admin/analytics"
                ? "Analytics"
                : "System Overview"}
            </h2>
          </div>
        </header>

        {/* Content */}

        <main
          className="
          flex-1
          overflow-y-auto
          p-4
          sm:p-6
          lg:p-8
          max-w-7xl
          w-full
          mx-auto
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;