import { type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Student from "../pages/Student";
import Subject from "../pages/Subject";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Task from "../pages/Task";
import Analytics from "../pages/Analytics";
import AIStudyPlanner from "../pages/AIStudyPlanner";

import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../components/AdminLayout";
import AdminUsers from "../pages/AdminUsers";
import SubjectManagement from "../pages/SubjectManagement";
import Profile from "../pages/Profile";
import Notes from "../pages/Notes";
import AdminAnalytics from "../pages/AdminAnalytics";
import AdminReports from "../pages/AdminReports";
import AdminProfile from "../pages/AdminProfile";

type RequireAuthTypes = {
  children: ReactNode;
  roles?: string[];
};

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth();

  // LOADING
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ROLE CHECK
  if (roles && !roles.some((role) => user?.roles?.includes(role))) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-3xl font-bold">
        🚫 Access Denied
      </div>
    );
  }

  return <>{children}</>;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  DASHBOARD WRAPPED ROUTES*/}

        <Route
          path="/student"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Student />
              </DashboardLayout>
            </RequireAuth>
          }
        />


        <Route
          path="/subjects"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Subject />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/tasks"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Task />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/analytics"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/ai-planner"
          element={
            <RequireAuth>
              <DashboardLayout>
                <AIStudyPlanner />
              </DashboardLayout>
            </RequireAuth>
          }
        />


        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/admin/subjects"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <AdminLayout>
                <SubjectManagement />
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </RequireAuth>
          }
        />


        <Route
          path="/notes"
          element={
            <RequireAuth>
              <DashboardLayout>
                <Notes />
              </DashboardLayout>
            </RequireAuth>}
        />
        <Route
          path="/admin/analytics"
          element={
            <RequireAuth>
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            </RequireAuth>}
        />

        <Route
          path="/admin/reports"
          element={
            <RequireAuth>
              <AdminLayout>
                <AdminReports />
              </AdminLayout>
            </RequireAuth>}
        />

        <Route
          path="/admin/profile"
          element={
            <RequireAuth>
              <AdminLayout>
                <AdminProfile />
              </AdminLayout>
            </RequireAuth>}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;