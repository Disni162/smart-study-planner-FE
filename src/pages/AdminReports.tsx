import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import api from "../service/api";

type ReportData = {
  totalUsers: number;
  totalSubjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  generatedAt: string;
};

const AdminReports = () => {
  const [report, setReport] =
    useState<ReportData | null>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get(
        "/admin/reports"
      );

      setReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = () => {
    if (!report) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "Smart Study Planner Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Total Users: ${report.totalUsers}`,
      20,
      50
    );

    doc.text(
      `Total Subjects: ${report.totalSubjects}`,
      20,
      60
    );

    doc.text(
      `Total Tasks: ${report.totalTasks}`,
      20,
      70
    );

    doc.text(
      `Completed Tasks: ${report.completedTasks}`,
      20,
      80
    );

    doc.text(
      `Pending Tasks: ${report.pendingTasks}`,
      20,
      90
    );

    doc.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      20,
      110
    );

    doc.save(
      "smart-study-planner-report.pdf"
    );
  };

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Reports Center
        </h1>

        <p className="text-gray-500">
          Generate and export system reports.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Total Users</h3>
          <p className="text-3xl font-bold">
            {report?.totalUsers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Subjects</h3>
          <p className="text-3xl font-bold">
            {report?.totalSubjects}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Tasks</h3>
          <p className="text-3xl font-bold">
            {report?.totalTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {report?.completedTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-red-600">
            {report?.pendingTasks}
          </p>
        </div>

      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Export Report
        </h2>

        <button
          onClick={downloadPDF}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl"
        >
          Download PDF Report
        </button>

      </div>

    </div>
  );
};

export default AdminReports;