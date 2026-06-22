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
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

interface Props {
  children: ReactNode;
}

// User data (Interface)
interface UserData {
  name: string;
  role?: string;
}

const AdminLayout = ({ children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setCurrentUser] = useState<UserData | null>(null);

  // Component eka Load wana wita localStorage eken User details ganna
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
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
      icon: <LayoutDashboard size={18} />,
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
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <FileText size={20} />,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: <User size={20} />,
    },
  ];



  return (
    <div className="flex min-h-screen bg-[#F4F7F6] text-[#3A4D4A] antialiased font-sans">
      {/* Sidebar */}
      <aside
        className="
          w-72
          bg-white
          border-r
          border-[#E2E8E5]
          flex
          flex-col
          justify-between
          h-screen
          sticky
          top-0
          p-6
        "
      >
        {/* Top Section: Logo & Navigation */}
        <div className="flex flex-col flex-1 overflow-y-auto space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F3F1] border border-[#D1E7E4] flex items-center justify-center text-[#2D7A6F] shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-[#1C2D2A]">
                Admin Console
              </h1>
              <p className="text-xs text-[#7A8A87] font-medium">
                Smart Study Planner
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#E8F3F1] text-[#2D7A6F] border border-[#D1E7E4]/40 font-semibold"
                      : "text-[#5C6E6B] hover:bg-[#F4F7F6] hover:text-[#1C2D2A]"
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? "text-[#2D7A6F]"
                        : "text-[#98A7A4]"
                    }
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Footer & Logout */}
        <div className="space-y-3 pt-4 border-t border-[#E2E8E5] mt-4">
         

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              justify-center
              gap-2
              w-full
              py-2.5
              rounded-xl
              text-xs
              font-medium
              bg-white
              hover:bg-[#FFF5F5]
              border
              border-[#E2E8E5]
              hover:border-[#FAD2D2]
              text-[#7A8A87]
              hover:text-red-600
              transition-all
              duration-150
              shadow-sm
              active:scale-95
            "
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E2E8E5] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xs font-semibold text-[#1C2D2A] uppercase tracking-wider">
              {location.pathname === "/admin/users"
                ? "User Management"
                : "System Overview"}
            </h2>
          </div>

         
        </header>

        <main className="flex-1 overflow-y-auto p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;