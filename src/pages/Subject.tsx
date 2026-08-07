import { useEffect, useState } from "react";
import api from "../service/api";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  Palette,
  X,
} from "lucide-react";

type Subject = {
  _id?: string;
  title: string;
  description?: string;
  color?: string;
};

const Subject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setColor("#6366f1");
    setEditingId(null);
  };

  const handleAddSubject = async () => {
    if (!title) {
      alert("Enter subject name");
      return;
    }

    try {
      await api.post("/subjects", {
        title,
        description,
        color,
      });

      resetForm();
      fetchSubjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (subject: Subject) => {
    setTitle(subject.title);
    setDescription(subject.description || "");
    setColor(subject.color || "#6366f1");
    setEditingId(subject._id || null);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await api.put(`/subjects/${editingId}`, {
        title,
        description,
        color,
      });

      resetForm();
      fetchSubjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id?: string) => {
    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Top Bar Header */}
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
              <BookOpen size={20} />
            </div>
            Subjects
          </h1>

          <p className="text-slate-500 text-xs mt-1">
            Manage your learning subjects and topics
          </p>
        </div>

        <button
          onClick={
            editingId
              ? handleUpdate
              : handleAddSubject
          }
          className="
          flex
          items-center
          justify-center
          gap-2
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          font-semibold
          text-xs
          px-5
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
          {editingId
            ? "Update Subject"
            : "Add Subject"}
        </button>
      </div>

      {/* Subject Input Form Card */}
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
        <div className="flex items-center justify-between">
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
            {editingId
              ? "Edit Subject Details"
              : "Create New Subject"}
          </h2>

          {editingId && (
            <button
              onClick={resetForm}
              className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1 font-medium"
            >
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
        >
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Title
            </label>
            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Mathematics, Science"
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
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Accent Color
            </label>
            <div
              className="
              flex
              items-center
              gap-3
              bg-slate-50/50
              border
              border-slate-200
              rounded-xl
              p-1.5
              px-3
            "
            >
              <input
                type="color"
                value={color}
                onChange={(e) =>
                  setColor(e.target.value)
                }
                className="
                w-7
                h-7
                rounded-lg
                cursor-pointer
                border-0
                bg-transparent
              "
              />
              <span className="text-xs font-mono font-medium text-slate-600 uppercase">
                {color}
              </span>
              <div
                style={{
                  backgroundColor: color,
                }}
                className="
                w-6
                h-6
                rounded-lg
                ml-auto
                shadow-sm
              "
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Add subject notes or goals..."
            className="
            w-full
            h-24
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
            resize-none
          "
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="space-y-3">
        <h2
          className="
          text-base
          font-bold
          text-slate-900
          tracking-tight
        "
        >
          📚 My Subjects ({subjects.length})
        </h2>

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
            <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <p className="text-slate-500 text-xs">
              No subjects added yet. Create one above!
            </p>
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
              const themeColor = subject.color || color;
              return (
                <div
                  key={subject._id}
                  className="
                  group
                  relative
                  bg-white
                  rounded-2xl
                  p-4
                  border
                  border-slate-100
                  shadow-sm
                  hover:shadow-md
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                "
                >
                  {/* Top Color Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-200 group-hover:h-1.5"
                    style={{ backgroundColor: themeColor }}
                  />

                  <div>
                    <div
                      className="
                      flex
                      justify-between
                      items-center
                      mb-3
                    "
                    >
                      <div
                        style={{
                          backgroundColor: themeColor,
                        }}
                        className="
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-white
                        text-base
                        shadow-sm
                        transition-transform
                        duration-200
                        group-hover:scale-105
                      "
                      >
                        {subject.title
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span
                        className="
                        text-[10px]
                        font-semibold
                        px-2.5
                        py-0.5
                        rounded-full
                        bg-emerald-50
                        text-emerald-600
                        border
                        border-emerald-100
                      "
                      >
                        Active
                      </span>
                    </div>

                    <h3
                      className="
                      text-base
                      font-bold
                      text-slate-800
                      group-hover:text-indigo-600
                      transition-colors
                    "
                    >
                      {subject.title}
                    </h3>

                    <p
                      className="
                      text-slate-500
                      mt-1
                      text-xs
                      line-clamp-2
                      leading-relaxed
                    "
                    >
                      {subject.description ||
                        "No description available"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    mt-4
                    pt-3
                    border-t
                    border-slate-50
                  "
                  >
                    <button
                      onClick={() =>
                        handleEdit(subject)
                      }
                      className="
                      flex-1
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      bg-indigo-50
                      hover:bg-indigo-600
                      text-indigo-600
                      hover:text-white
                      text-xs
                      font-semibold
                      py-1.5
                      rounded-lg
                      transition-all
                      duration-150
                    "
                    >
                      <Edit size={13} />
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(subject._id)
                      }
                      className="
                      flex-1
                      flex
                      items-center
                      justify-center
                      gap-1.5
                      bg-rose-50
                      hover:bg-rose-600
                      text-rose-600
                      hover:text-white
                      text-xs
                      font-semibold
                      py-1.5
                      rounded-lg
                      transition-all
                      duration-150
                    "
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subject;