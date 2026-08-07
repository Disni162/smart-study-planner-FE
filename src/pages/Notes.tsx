import { useEffect, useState } from "react";
import api from "../service/api";
import jsPDF from "jspdf";

import {
  Plus,
  Trash2,
  Edit,
  FileText,
  Sparkles,
  Wand2,
  Download,
  StickyNote,
  Bot,
} from "lucide-react";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [aiTopic, setAiTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // GET NOTES
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // CREATE / UPDATE NOTE
  const saveNote = async () => {
    if (!title.trim()) {
      alert("Please enter note title");
      return;
    }

    if (!content.trim()) {
      alert("Please enter note content");
      return;
    }

    try {
      if (editId) {
        await api.put(`/notes/${editId}`, {
          title: title.trim(),
          content: content.trim(),
        });
      } else {
        await api.post("/notes", {
          title: title.trim(),
          content: content.trim(),
        });
      }

      setTitle("");
      setContent("");
      setEditId(null);
      fetchNotes();
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    }
  };

  // EDIT NOTE
  const editNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
  };

  // AI NOTE GENERATOR
  const generateAINote = async () => {
    if (!aiTopic.trim()) {
      alert("Enter topic");
      return;
    }

    try {
      setAiLoading(true);

      const res = await api.post("/ai/generate-note", {
        topic: aiTopic,
      });

      setTitle(aiTopic);
      setContent(res.data.note);
      setAiTopic("");
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      alert("AI generation failed");
    } finally {
      setAiLoading(false);
    }
  };

  // PDF DOWNLOAD
  const downloadPDF = (note: Note) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Smart Study Planner", 15, 18);

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(note.title, 15, 45);

    // Date
    doc.setFontSize(10);
    doc.text(
      `Created: ${new Date(note.createdAt).toLocaleString()}`,
      15,
      55
    );

    // Line
    doc.line(15, 60, 195, 60);

    const lines = doc.splitTextToSize(note.content, 170);

    let y = 75;

    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(line, 15, y);
      y += 8;
    });

    doc.save(`${note.title}.pdf`);
  };

  const cardColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-indigo-500 to-violet-500",
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 py-4">
      {/* Header Bar Banner */}
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

        <div className="relative z-10 flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-indigo-300 border border-white/10">
            <StickyNote size={24} />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-indigo-200 border border-white/10 mb-1">
              <Sparkles size={12} className="text-amber-300" />
              <span>Study Materials</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              📝 My Notes
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Create and manage your study notes effortlessly
            </p>
          </div>
        </div>
      </div>

      {/* AI Generator Card */}
      <div
        className="
        bg-gradient-to-r
        from-indigo-900
        to-purple-900
        rounded-2xl
        p-4
        sm:p-5
        text-white
        shadow-md
        border
        border-indigo-800/50
        space-y-3
      "
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-white/10 text-amber-300 border border-white/10">
            <Bot size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              AI Study Note Generator
            </h2>
            <p className="text-[11px] text-indigo-200">
              Generate smart study notes using Gemini AI
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <input
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            placeholder="Enter topic (Example: React Hooks)"
            className="
              flex-1
              px-3.5
              py-2
              rounded-xl
              bg-white
              text-slate-800
              placeholder-slate-400
              text-xs
              outline-none
              focus:ring-2
              focus:ring-amber-400
            "
          />

          <button
            onClick={generateAINote}
            disabled={aiLoading}
            className="
              bg-amber-400
              hover:bg-amber-300
              text-slate-950
              px-4
              py-2
              rounded-xl
              flex
              items-center
              justify-center
              gap-1.5
              font-bold
              text-xs
              transition-all
              disabled:opacity-50
              shadow-sm
            "
          >
            <Wand2 size={14} />
            {aiLoading ? "Generating..." : "Generate AI Note"}
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-100
        shadow-sm
        p-4
        sm:p-5
        space-y-3
      "
      >
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Sparkles size={15} className="text-amber-500" />
          {editId ? "Edit Note" : "Create New Note"}
        </h2>

        <div className="space-y-2.5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="
              w-full
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
            "
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            rows={4}
            className="
              w-full
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

        <button
          onClick={saveNote}
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
            sm:w-auto
          "
        >
          <Plus size={16} />
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Notes List Section */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Saved Notes ({notes.length})
        </h2>

        {notes.length === 0 ? (
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
              <FileText size={20} />
            </div>
            <p className="text-slate-500 text-xs">
              No notes available. Create or generate one above!
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
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="
                  group
                  relative
                  bg-white
                  rounded-2xl
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
                {/* Top Accent Stripe */}
                <div
                  className={`
                    h-1.5
                    bg-gradient-to-r
                    ${cardColors[index % cardColors.length]}
                  `}
                />

                <div className="p-4 space-y-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {note.title}
                    </h3>

                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-4 leading-relaxed pt-1">
                    {note.content}
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="p-4 pt-0 mt-auto">
                  <div className="flex items-center gap-1.5 pt-3 border-t border-slate-50">
                    <button
                      onClick={() => downloadPDF(note)}
                      className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-1
                        bg-emerald-50
                        hover:bg-emerald-600
                        text-emerald-600
                        hover:text-white
                        text-xs
                        font-semibold
                        py-1.5
                        rounded-lg
                        transition-all
                      "
                      title="Download PDF"
                    >
                      <Download size={13} />
                      PDF
                    </button>

                    <button
                      onClick={() => editNote(note)}
                      className="
                        p-1.5
                        rounded-lg
                        bg-indigo-50
                        hover:bg-indigo-600
                        text-indigo-600
                        hover:text-white
                        transition-all
                      "
                      title="Edit Note"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => deleteNote(note._id)}
                      className="
                        p-1.5
                        rounded-lg
                        bg-rose-50
                        hover:bg-rose-600
                        text-rose-600
                        hover:text-white
                        transition-all
                      "
                      title="Delete Note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;