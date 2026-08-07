import { useState } from "react";
import api from "../service/api";

import {
  Sparkles,
  CalendarDays,
  Clock,
  BookOpen,
  Brain,
  FileText,
  Bot,
} from "lucide-react";

const AIStudyPlanner = () => {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [topics, setTopics] = useState("");
  const [plan, setPlan] = useState("");

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !examDate || !hoursPerDay) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/generate-plan", {
        subject,
        examDate,
        hoursPerDay,
      });

      setPlan(res.data.plan);
    } catch (err: any) {
      console.log(err);

      alert(
        err.response?.data?.message || "Failed to generate plan"
      );
    } finally {
      setLoading(false);
    }
  };

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
            <Brain size={24} />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-indigo-200 border border-white/10 mb-1">
              <Bot size={12} className="text-amber-300" />
              <span>Smart Assistant</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              AI Study Planner 🤖
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Generate your personalized study timetable using AI
            </p>
          </div>
        </div>
      </div>

      {/* Input Form Card */}
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
          Create Study Plan
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-3.5
        "
        >
          {/* SUBJECT */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Subject
            </label>

            <div className="relative">
              <BookOpen
                size={16}
                className="
                absolute
                left-3
                top-3
                text-slate-400
              "
              />

              <input
                type="text"
                placeholder="Example: React"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="
                w-full
                pl-9
                pr-3
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
            </div>
          </div>

          {/* DATE */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Exam Date
            </label>

            <div className="relative">
              <CalendarDays
                size={16}
                className="
                absolute
                left-3
                top-3
                text-slate-400
              "
              />

              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="
                w-full
                pl-9
                pr-3
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
            </div>
          </div>

          {/* HOURS */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Hours Per Day
            </label>

            <div className="relative">
              <Clock
                size={16}
                className="
                absolute
                left-3
                top-3
                text-slate-400
              "
              />

              <input
                type="number"
                placeholder="2"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                className="
                w-full
                pl-9
                pr-3
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
            </div>
          </div>
        </div>

        {/* TOPICS */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <FileText size={12} /> Topics To Cover
          </label>

          <textarea
            placeholder="React Basics, JSX, Components, Hooks, Context API, Redux..."
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            rows={3}
            className="
              w-full
              p-3
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

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="
          w-full
          py-2.5
          px-4
          rounded-xl
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          font-semibold
          text-xs
          shadow-md
          shadow-indigo-500/20
          hover:shadow-indigo-500/30
          transition-all
          disabled:opacity-50
          flex
          items-center
          justify-center
          gap-2
          "
        >
          {loading ? (
            <>
              <Sparkles size={14} className="animate-spin text-amber-300" />
              <span>Creating AI Plan...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} />
              <span>Generate Study Plan</span>
            </>
          )}
        </button>
      </div>

      {/* RESULT CARD */}
      {plan && (
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
          <div
            className="
            flex
            items-center
            gap-3
            pb-3
            border-b
            border-slate-100
          "
          >
            <div
              className="
              p-2.5
              rounded-xl
              bg-indigo-50
              text-indigo-600
              border
              border-indigo-100
            "
            >
              <Sparkles size={18} />
            </div>

            <div>
              <h2
                className="
                text-sm
                font-bold
                text-slate-800
              "
              >
                Your AI Generated Plan
              </h2>

              <p
                className="
                text-slate-500
                text-[11px]
              "
              >
                Follow this schedule for better results
              </p>
            </div>
          </div>

          <div
            className="
            bg-slate-50/70
            rounded-xl
            p-4
            border
            border-slate-200/60
            leading-relaxed
            text-xs
            text-slate-700
            whitespace-pre-wrap
            font-mono
          "
          >
            {plan}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStudyPlanner;