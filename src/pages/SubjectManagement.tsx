import { useEffect, useState } from "react";
import axios from "axios";

type Subject = {
  _id: string;
  title: string;
  description?: string;
  color?: string;

  userId?: {
    _id: string;
    name: string;
    email: string;
  };
};

const API = "https://study-planner-app-be-i6jl.vercel.app/api/v1";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthConfig = () => {
    const token =
      localStorage.getItem("ACCESS_TOKEN") ||
      localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API}/admin/subjects`,
        getAuthConfig()
      );

      setSubjects(res.data);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch subjects"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/admin/subjects/${id}`,
        getAuthConfig()
      );

      setSubjects((prev) =>
        prev.filter((subject) => subject._id !== id)
      );

      alert("Subject deleted successfully");
    } catch (err: any) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Delete failed"
      );
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Subject Management
        </h2>
        <p className="text-gray-500 mt-1">
          View and manage student subjects
        </p>
      </div>

      {loading && (
        <div className="text-center py-6">
          Loading subjects...
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {!loading && subjects.length === 0 && !error && (
        <div className="text-center py-6 text-gray-500">
          No subjects found.
        </div>
      )}

      {!loading && subjects.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border text-left">
                  Student Name
                </th>

                <th className="p-3 border text-left">
                  Email
                </th>

                <th className="p-3 border text-left">
                  Subject
                </th>

                <th className="p-3 border text-left">
                  Description
                </th>

                <th className="p-3 border text-left">
                  Color
                </th>

                <th className="p-3 border text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject) => (
                <tr
                  key={subject._id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border">
                    {subject.userId?.name ||
                      "Unknown User"}
                  </td>

                  <td className="p-3 border">
                    {subject.userId?.email || "-"}
                  </td>

                  <td className="p-3 border font-medium">
                    {subject.title}
                  </td>

                  <td className="p-3 border">
                    {subject.description || "-"}
                  </td>

                  <td className="p-3 border">
                    <span
                      style={{
                        background:
                          subject.color || "#6B7280",
                      }}
                      className="text-white px-3 py-1 rounded-md text-sm"
                    >
                      {subject.color || "none"}
                    </span>
                  </td>

                  <td className="p-3 border text-center">
                    <button
                      onClick={() =>
                        handleDelete(subject._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;