import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import api from "../service/api";
import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  Calendar,
  Loader2,
} from "lucide-react";

type ReportData = {
  totalUsers: number;
  totalSubjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  generatedAt: string;
};

const AdminReports = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get("/admin/reports");
      setReport(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!report) return;

    const doc = new jsPDF();

    // PDF Clean Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.text("Smart Study Planner Report", 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 33);

    // Horizontal Line
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 38, 190, 38);

    // Report Details
    doc.setFontSize(12);
    doc.setTextColor(51, 65, 85);

    doc.text(`Total Users: ${report.totalUsers}`, 20, 50);
    doc.text(`Total Subjects: ${report.totalSubjects}`, 20, 60);
    doc.text(`Total Tasks: ${report.totalTasks}`, 20, 70);
    doc.text(`Completed Tasks: ${report.completedTasks}`, 20, 80);
    doc.text(`Pending Tasks: ${report.pendingTasks}`, 20, 90);

    doc.save("smart-study-planner-report.pdf");
  };

  const statCards = [
    {
      title: "Total Users",
      value: report?.totalUsers,
      icon: Users,
      color: "text-sky-700",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-100/80",
    },
    {
      title: "Subjects",
      value: report?.totalSubjects,
      icon: BookOpen,
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100/80",
    },
    {
      title: "Tasks",
      value: report?.totalTasks,
      icon: ClipboardList,
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100/80",
    },
    {
      title: "Completed",
      value: report?.completedTasks,
      icon: CheckCircle2,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100/80",
    },
    {
      title: "Pending",
      value: report?.pendingTasks,
      icon: Clock,
      color: "text-rose-700",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100/80",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-base font-medium text-slate-500">
          Preparing System Reports...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 text-slate-700 antialiased font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Welcome / Header Banner */}
        <div className="relative overflow-hidden bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-gradient-to-br from-teal-50/50 via-sky-50/30 to-transparent blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-100/80 rounded-full">
              System Exports
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-800">
              Reports Center
            </h1>
            <p className="text-slate-500 text-sm sm:text-base mt-1 max-w-2xl">
              Generate and export comprehensive system performance reports in portable formats.
            </p>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {statCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className={`bg-white border ${card.borderColor} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {card.title}
                  </span>
                  <div className={`p-2.5 rounded-xl ${card.bgColor} ${card.color}`}>
                    <IconComponent className="w-5 h-5 opacity-90" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-slate-800 tracking-tight">
                    {card.value !== undefined ? card.value.toLocaleString() : "0"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Export Options Box */}
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-800 font-semibold text-lg">
              <FileSpreadsheet className="w-5 h-5 text-teal-700" />
              <span>Export System Summary</span>
            </div>
            <p className="text-sm text-slate-500 max-w-lg">
              Download a detailed summary containing current user activity, task completions, and subject analytics.
            </p>
            <div className="flex items-center space-x-2 pt-2 text-xs text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Format: PDF Document (.pdf)</span>
            </div>
          </div>

          <button
            onClick={downloadPDF}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminReports;